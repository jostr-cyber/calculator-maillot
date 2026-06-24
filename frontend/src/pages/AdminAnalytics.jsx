import React, { useState, useEffect, useMemo } from 'react'
import API_BASE_URL from '../config/api'
import './AdminAnalytics.css'

const STORAGE_KEY = 'rg_analytics_admin_key'

function formatDate(iso, locale = 'ru-RU') {
  if (!iso) return '—'
  const d = new Date(iso)
  return d.toLocaleString(locale, { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function formatPrice(amount) {
  if (amount == null) return '—'
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount)
}

function statusBadge(status) {
  const map = {
    whatsapp_clicked: { label: '💬 WhatsApp', cls: 'badge-success' },
    contact_saved: { label: '📱 Оставил контакт', cls: 'badge-contact' },
    calculator_completed: { label: 'Дошёл до цены', cls: 'badge-default' },
  }
  const cfg = map[status] || { label: status || '—', cls: 'badge-default' }
  return <span className={`adm-badge ${cfg.cls}`}>{cfg.label}</span>
}

function complexityBadge(complexity) {
  if (!complexity?.level) return '—'
  const cls = `adm-badge complexity-${complexity.level.toLowerCase()}`
  return <span className={cls}>{complexity.level}</span>
}

function languageFlag(lang) {
  const flags = { ru: '🇷🇺', en: '🇬🇧', es: '🇪🇸' }
  return <span title={lang}>{flags[lang] || '🌐'}</span>
}

function AdminAnalytics() {
  const [key, setKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '')
  const [authed, setAuthed] = useState(false)
  const [calcs, setCalcs] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // all | whatsapp | completed | reduce-opened
  const [search, setSearch] = useState('')

  const fetchData = async (k = key) => {
    if (!k) return
    setLoading(true)
    setError(null)
    try {
      const url = `${API_BASE_URL}/api/analytics/calculations?key=${encodeURIComponent(k)}`
      const res = await fetch(url)
      if (res.status === 401) {
        setError('Неверный ключ доступа')
        setAuthed(false)
        return
      }
      if (!res.ok) throw new Error(res.statusText)
      const data = await res.json()
      setCalcs(data.calculations || [])
      setSummary(data.summary || null)
      setAuthed(true)
      localStorage.setItem(STORAGE_KEY, k)
    } catch (e) {
      setError('Ошибка загрузки: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (key) fetchData(key)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Auto-refresh every 30s once authed
  useEffect(() => {
    if (!authed) return
    const t = setInterval(() => fetchData(key), 30000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed])

  const filtered = useMemo(() => {
    let list = calcs
    if (filter === 'whatsapp') list = list.filter((c) => c.status === 'whatsapp_clicked')
    if (filter === 'completed') list = list.filter((c) => c.status === 'calculator_completed')
    if (filter === 'reduce-opened') list = list.filter((c) => c.reduceModalOpened)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter((c) =>
        (c.id || '').toLowerCase().includes(q) ||
        (c.serverMeta?.ip || '').includes(q) ||
        (c.config?.designSource || '').toLowerCase().includes(q) ||
        (c.language || '').includes(q)
      )
    }
    return list
  }, [calcs, filter, search])

  const stats = useMemo(() => {
    if (!calcs.length) return null
    const total = calcs.length
    const wa = calcs.filter((c) => c.status === 'whatsapp_clicked').length
    const reduce = calcs.filter((c) => c.reduceModalOpened).length
    const prices = calcs.map((c) => c.finalPrice).filter((p) => typeof p === 'number')
    const avgPrice = prices.length ? Math.round(prices.reduce((s, p) => s + p, 0) / prices.length) : 0

    // popular options
    const count = (key) => {
      const m = {}
      for (const c of calcs) {
        const v = c.config?.[key]
        if (v == null || v === '' || v === 'none' || v === 'nothing') continue
        m[v] = (m[v] || 0) + 1
      }
      return Object.entries(m).sort((a, b) => b[1] - a[1])
    }

    const langMap = {}
    for (const c of calcs) {
      const l = c.language || '?'
      langMap[l] = (langMap[l] || 0) + 1
    }
    const langs = Object.entries(langMap).sort((a, b) => b[1] - a[1])

    return {
      total,
      wa,
      reduce,
      avgPrice,
      convRate: total ? Math.round((wa / total) * 100) : 0,
      designSource: count('designSource'),
      decorativeElements: count('decorativeElements'),
      aerography: count('aerography'),
      langs,
    }
  }, [calcs])

  if (!authed) {
    return (
      <div className="adm-login-wrap">
        <div className="adm-login-card">
          <h1>🔐 RhythmIQ Analytics</h1>
          <p className="adm-login-sub">Введите ключ доступа</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              fetchData(key)
            }}
          >
            <input
              type="password"
              className="adm-input"
              placeholder="ключ доступа"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              autoFocus
            />
            <button type="submit" className="adm-btn-primary" disabled={loading || !key}>
              {loading ? 'Проверка…' : 'Войти'}
            </button>
          </form>
          {error && <p className="adm-error">{error}</p>}
          <p className="adm-hint">По умолчанию (dev): <code>rg-analytics-dev</code></p>
        </div>
      </div>
    )
  }

  return (
    <div className="adm-page">
      <header className="adm-header">
        <div>
          <h1>📊 RhythmIQ Analytics</h1>
          <p className="adm-subtitle">
            Все расчёты клиентов, даже те, кто не отправил заявку
            {summary?.newest && ` · последний: ${formatDate(summary.newest)}`}
          </p>
        </div>
        <div className="adm-header-actions">
          <button className="adm-btn-ghost" onClick={() => fetchData(key)} disabled={loading}>
            {loading ? '⏳' : '🔄'} Обновить
          </button>
          <button
            className="adm-btn-ghost"
            onClick={() => {
              localStorage.removeItem(STORAGE_KEY)
              setAuthed(false)
              setKey('')
            }}
          >
            🚪 Выйти
          </button>
        </div>
      </header>

      {error && <div className="adm-error-banner">{error}</div>}

      {stats && (
        <section className="adm-stats">
          <div className="adm-stat">
            <div className="adm-stat-num">{stats.total}</div>
            <div className="adm-stat-lbl">Всего расчётов</div>
          </div>
          <div className="adm-stat adm-stat-accent">
            <div className="adm-stat-num">{stats.wa}</div>
            <div className="adm-stat-lbl">Нажали WhatsApp · {stats.convRate}%</div>
          </div>
          <div className="adm-stat">
            <div className="adm-stat-num">{stats.reduce}</div>
            <div className="adm-stat-lbl">Открыли «снизить цену»</div>
          </div>
          <div className="adm-stat">
            <div className="adm-stat-num">{formatPrice(stats.avgPrice)}</div>
            <div className="adm-stat-lbl">Средняя цена</div>
          </div>
        </section>
      )}

      {stats && (
        <section className="adm-popular">
          {[
            { title: 'Языки', items: stats.langs },
            { title: 'Откуда дизайн', items: stats.designSource.slice(0, 4) },
            { title: 'Декор. элементы', items: stats.decorativeElements.slice(0, 4) },
            { title: 'Аэрография', items: stats.aerography.slice(0, 4) },
          ].map((block) => (
            <div key={block.title} className="adm-popular-card">
              <h3>{block.title}</h3>
              {block.items.length === 0 ? (
                <p className="adm-empty">—</p>
              ) : (
                <ul>
                  {block.items.map(([k, n]) => (
                    <li key={k}>
                      <span>{k}</span>
                      <strong>{n}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      <section className="adm-controls">
        <div className="adm-filters">
          {[
            { id: 'all', label: 'Все' },
            { id: 'whatsapp', label: '💬 WhatsApp' },
            { id: 'reduce-opened', label: '💰 Снижали цену' },
            { id: 'completed', label: 'Только дошёл до цены' },
          ].map((f) => (
            <button
              key={f.id}
              className={`adm-filter ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          className="adm-search"
          placeholder="Поиск по ID, IP, языку…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      <section className="adm-table-wrap">
        {filtered.length === 0 ? (
          <p className="adm-empty">Расчётов пока нет</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Когда</th>
                <th>ID</th>
                <th>🌐</th>
                <th>Статус</th>
                <th>Цена</th>
                <th>Бюджет</th>
                <th>Сложн.</th>
                <th>Опции</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="adm-cell-date">{formatDate(c.createdAt || c.updatedAt)}</td>
                  <td className="adm-cell-id"><code>{c.id}</code></td>
                  <td>{languageFlag(c.language)}</td>
                  <td>
                    {statusBadge(c.status)}
                    {c.reduceModalOpened && <span className="adm-mini-flag" title="Открыл «Снизить цену»">💰</span>}
                    {c.savedContact && (
                      <div className="adm-saved-contact" title="Контакт, оставленный клиентом">
                        📱 <strong>{c.savedContact}</strong>
                      </div>
                    )}
                  </td>
                  <td className="adm-cell-price">
                    {formatPrice(c.finalPrice)}
                    {c.optimizedPrice && (
                      <div className="adm-optimized">→ {formatPrice(c.optimizedPrice)}</div>
                    )}
                  </td>
                  <td>{c.budget && c.budget !== 'undecided' ? `~${c.budget}€` : '—'}</td>
                  <td>{complexityBadge(c.complexity)}</td>
                  <td className="adm-cell-options">
                    {c.config?.designSource && <span className="adm-chip">{c.config.designSource}</span>}
                    {c.config?.sleeves != null && c.config.sleeves !== 0 && (
                      <span className="adm-chip">рукав×{c.config.sleeves}</span>
                    )}
                    {c.config?.skirt && c.config.skirt !== '' && (
                      <span className="adm-chip">юбка: {c.config.skirt}</span>
                    )}
                    {c.config?.decorativeElements && c.config.decorativeElements !== 'none' && c.config.decorativeElements !== '' && (
                      <span className="adm-chip">{c.config.decorativeElements}</span>
                    )}
                    {c.config?.aerography && c.config.aerography !== 'nothing' && (
                      <span className="adm-chip">{c.config.aerography}</span>
                    )}
                    {c.config?.rhinestone && c.config.rhinestone !== 'none' && (
                      <span className="adm-chip">{c.config.rhinestone} страз</span>
                    )}
                    {c.config?.urgency && c.config.urgency !== 'none' && (
                      <span className="adm-chip adm-chip-warn">{c.config.urgency}</span>
                    )}
                  </td>
                  <td className="adm-cell-ip" title={c.serverMeta?.userAgent || ''}>{c.serverMeta?.ip || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <footer className="adm-foot">
        Обновляется автоматически каждые 30 секунд · {calcs.length} запис{calcs.length === 1 ? 'ь' : calcs.length < 5 ? 'и' : 'ей'}
      </footer>
    </div>
  )
}

export default AdminAnalytics

import React, { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import API_BASE_URL from '../config/api'
import '../styles/AdminSurveys.css'

function AdminSurveys() {
  const { t } = useTranslation()
  const [surveys, setSurveys] = useState([])
  const [filteredSurveys, setFilteredSurveys] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [exporting, setExporting] = useState(false)

  // Load all surveys on component mount
  useEffect(() => {
    fetchSurveys()
  }, [])

  // Apply filters whenever dates change
  useEffect(() => {
    applyFilters()
  }, [surveys, startDate, endDate])

  const fetchSurveys = async (start, end) => {
    try {
      setLoading(true)
      setError(null)

      let url = `${API_BASE_URL}/api/admin/surveys`
      const params = new URLSearchParams()
      if (start) params.append('startDate', start)
      if (end) params.append('endDate', end)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`)
      }

      const data = await response.json()
      setSurveys(data.surveys || [])
    } catch (err) {
      console.error('Error fetching surveys:', err)
      setError(`Error loading surveys: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = surveys

    // Filter by start date
    if (startDate) {
      const start = new Date(startDate)
      filtered = filtered.filter(s => new Date(s.timestamp) >= start)
    }

    // Filter by end date
    if (endDate) {
      const end = new Date(endDate)
      end.setDate(end.getDate() + 1) // Include the entire end date
      filtered = filtered.filter(s => new Date(s.timestamp) < end)
    }

    setFilteredSurveys(filtered)
  }

  const handleApplyFilter = () => {
    // Refetch with new filters
    fetchSurveys(startDate, endDate)
  }

  const handleExport = async () => {
    try {
      setExporting(true)

      let url = `${API_BASE_URL}/api/admin/surveys/export`
      const params = new URLSearchParams()
      if (startDate) params.append('startDate', startDate)
      if (endDate) params.append('endDate', endDate)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Export failed: ${response.statusText}`)
      }

      // Get the filename from response headers
      const contentDisposition = response.headers.get('content-disposition')
      let filename = 'surveys.json'
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/)
        if (match) filename = match[1]
      }

      // Create a blob and download
      const blob = await response.blob()
      const url_obj = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url_obj
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url_obj)
      document.body.removeChild(a)

      console.log(`✓ Exported ${filteredSurveys.length} surveys`)
    } catch (err) {
      console.error('Error exporting surveys:', err)
      setError(`Export error: ${err.message}`)
    } finally {
      setExporting(false)
    }
  }

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('ru-RU')
  }

  const formatArrayField = (arr) => {
    if (!arr || arr.length === 0) return '—'
    return arr.join(', ')
  }

  return (
    <div className="admin-surveys">
      <div className="admin-header">
        <h1>{t('admin.title')}</h1>
        <p className="admin-subtitle">{t('admin.subtitle')}</p>
      </div>

      {error && (
        <div className="admin-error">
          <span>{t('admin.error', { error })}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Filter Section */}
      <div className="admin-filters">
        <h2>{t('admin.filters.title')}</h2>
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="startDate">{t('admin.filters.startDate')}</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="endDate">{t('admin.filters.endDate')}</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <button
              className="btn-filter"
              onClick={handleApplyFilter}
              disabled={loading}
            >
              {t('admin.filters.apply')}
            </button>
            <button
              className="btn-export"
              onClick={handleExport}
              disabled={loading || exporting || filteredSurveys.length === 0}
            >
              {exporting ? t('admin.exporting') : t('admin.export')}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {!loading && (
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-label">{t('admin.stats.total')}</span>
            <span className="stat-value">{surveys.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">{t('admin.stats.shown')}</span>
            <span className="stat-value">{filteredSurveys.length}</span>
          </div>
        </div>
      )}

      {/* Surveys Table Section */}
      <div className="admin-content">
        {loading ? (
          <div className="loading">
            <p>{t('admin.loading')}</p>
          </div>
        ) : filteredSurveys.length === 0 ? (
          <div className="no-surveys">
            <p>{t('admin.empty.title')}</p>
            {surveys.length > 0 && (
              <p className="hint">{t('admin.empty.hint')}</p>
            )}
          </div>
        ) : (
          <div className="surveys-table-wrapper">
            <table className="surveys-table">
              <thead>
                <tr>
                  <th>{t('admin.table.email')}</th>
                  <th>{t('admin.table.date')}</th>
                  <th>{t('admin.table.age')}</th>
                  <th>{t('admin.table.importance')}</th>
                  <th>{t('admin.table.howFound')}</th>
                  <th>{t('admin.table.notes')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurveys.map((survey, index) => (
                  <tr key={survey.id || index}>
                    <td className="email-cell">
                      <a href={`mailto:${survey.email}`}>{survey.email}</a>
                    </td>
                    <td className="date-cell">{formatDate(survey.timestamp)}</td>
                    <td className="age-cell">{survey.age || '—'}</td>
                    <td className="importance-cell">{survey.importance || '—'}</td>
                    <td className="howfound-cell">
                      {formatArrayField(survey.howFound)}
                    </td>
                    <td className="notes-cell" title={survey.otherInfluence}>
                      {survey.otherInfluence
                        ? survey.otherInfluence.substring(0, 30) +
                          (survey.otherInfluence.length > 30 ? '...' : '')
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer with info */}
      {!loading && filteredSurveys.length > 0 && (
        <div className="admin-footer">
          <p>{t('admin.footer')}</p>
        </div>
      )}
    </div>
  )
}

export default AdminSurveys

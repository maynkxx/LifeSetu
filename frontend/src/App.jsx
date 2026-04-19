import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = 'https://lifesetu-ii41.onrender.com';

function App() {
  const [resource, setResource] = useState({ type: '', quantity: '', lat: '', lng: '' });
  const [request, setRequest] = useState({ type: '', severity: 'medium', lat: '', lng: '' });
  const [requestId, setRequestId] = useState('');
  const [data, setData] = useState([]);
  const [matchResult, setMatchResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${BASE_URL}/resources`, {
        type: resource.type,
        quantity: Number(resource.quantity),
        location: { type: 'Point', coordinates: [Number(resource.lng), Number(resource.lat)] }
      });
      setSuccess('Resource created successfully!');
      setResource({ type: '', quantity: '', lat: '', lng: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create resource');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await axios.post(`${BASE_URL}/requests`, {
        type: request.type,
        severity: request.severity,
        location: { type: 'Point', coordinates: [Number(request.lng), Number(request.lat)] }
      });
      setSuccess('Request created successfully!');
      setRequest({ type: '', severity: 'medium', lat: '', lng: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  const loadResources = async () => {
    setLoading(true);
    setError('');
    setData([]);
    try {
      const res = await axios.get(`${BASE_URL}/resources`);
      setData(res.data.data);
    } catch (err) {
      setError('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const loadRequests = async () => {
    setLoading(true);
    setError('');
    setData([]);
    try {
      const res = await axios.get(`${BASE_URL}/requests`);
      setData(res.data.data);
    } catch (err) {
      setError('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleMatch = async () => {
    if (!requestId) return;
    setLoading(true);
    setError('');
    setMatchResult(null);
    try {
      const res = await axios.post(`${BASE_URL}/match/${requestId}`);
      setMatchResult(res.data.data || res.data);
      setSuccess('Match successful!');
    } catch (err) {
      setError(err.response?.data?.message || 'Matching failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      <h1>LifeSetu Dashboard</h1>
      
      {loading && <p style={{ color: '#007bff' }}>Processing...</p>}
      {error && <p style={{ color: '#dc3545', padding: '10px', background: '#f8d7da', borderRadius: '4px' }}>{error}</p>}
      {success && <p style={{ color: '#28a745', padding: '10px', background: '#d4edda', borderRadius: '4px' }}>{success}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <section style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>➕ Create Resource</h3>
          <form onSubmit={handleResourceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input placeholder="Type (e.g. oxygen)" value={resource.type} onChange={e => setResource({...resource, type: e.target.value})} required />
            <input type="number" placeholder="Quantity" value={resource.quantity} onChange={e => setResource({...resource, quantity: e.target.value})} required />
            <input type="number" step="any" placeholder="Latitude" value={resource.lat} onChange={e => setResource({...resource, lat: e.target.value})} required />
            <input type="number" step="any" placeholder="Longitude" value={resource.lng} onChange={e => setResource({...resource, lng: e.target.value})} required />
            <button type="submit" style={{ cursor: 'pointer' }}>Add Resource</button>
          </form>
        </section>

        <section style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
          <h3>🆘 Create Request</h3>
          <form onSubmit={handleRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input placeholder="Type (e.g. oxygen)" value={request.type} onChange={e => setRequest({...request, type: e.target.value})} required />
            <select value={request.severity} onChange={e => setRequest({...request, severity: e.target.value})}>
              <option value="low">Severity: Low</option>
              <option value="medium">Severity: Medium</option>
              <option value="high">Severity: High</option>
            </select>
            <input type="number" step="any" placeholder="Latitude" value={request.lat} onChange={e => setRequest({...request, lat: e.target.value})} required />
            <input type="number" step="any" placeholder="Longitude" value={request.lng} onChange={e => setRequest({...request, lng: e.target.value})} required />
            <button type="submit" style={{ cursor: 'pointer' }}>Submit Request</button>
          </form>
        </section>
      </div>

      <section style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>🔍 Match Request</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input placeholder="Enter Request ID" style={{ flex: 1 }} value={requestId} onChange={e => setRequestId(e.target.value)} />
          <button onClick={handleMatch} style={{ cursor: 'pointer' }}>Match Now</button>
        </div>
        {matchResult && (
          <div style={{ marginTop: '15px', backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '4px' }}>
            <h4>Match Success!</h4>
            <pre style={{ fontSize: '12px', overflow: 'auto' }}>{JSON.stringify(matchResult, null, 2)}</pre>
          </div>
        )}
      </section>

      <section style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>📊 Data View</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <button onClick={loadResources} style={{ cursor: 'pointer' }}>List Resources</button>
          <button onClick={loadRequests} style={{ cursor: 'pointer' }}>List Requests</button>
        </div>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {data.length > 0 ? data.map((item, i) => (
            <div key={i} style={{ padding: '10px', borderBottom: '1px solid #eee', fontSize: '13px' }}>
               <strong>ID: {item._id}</strong> | Type: {item.type} 
               <pre style={{ margin: '5px 0' }}>{JSON.stringify(item, null, 2)}</pre>
            </div>
          )) : <p>No data loaded yet.</p>}
        </div>
      </section>
    </div>
  );
}

export default App;

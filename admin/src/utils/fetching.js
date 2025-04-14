import axios from 'axios';

export const API = 'http://localhost:5000';

const headers = () => ({
    headers: {
        Authorization: `Bearer ${sessionStorage.access}`,
    },
});

export const get = async (pref = '/', params = {}) => {
    try {
        const res = await axios.get(`${API}/api${pref}`, {
            ...headers(),
            params,
        });
        return res.data;
    } catch (err) {
        console.error('GET error:', err);
        throw err;
    }
};

export const post = async (pref = '/', data = {}) => {
    try {
        const res = await axios.post(`${API}/api${pref}`, data, headers());
        return res.data;
    } catch (err) {
        console.error('POST error:', err);
        throw err;
    }
};

export const put = async (pref = '/', data = {}) => {
    try {
        const res = await axios.put(`${API}/api${pref}`, data, headers());
        return res.data;
    } catch (err) {
        console.error('PUT error:', err);
        throw err;
    }
};

export const del = async (pref = '/', params = {}) => {
    try {
        const res = await axios.delete(`${API}/api${pref}`, {
            ...headers(),
            params,
        });
        return res.data;
    } catch (err) {
        console.error('DELETE error:', err);
        throw err;
    }
};

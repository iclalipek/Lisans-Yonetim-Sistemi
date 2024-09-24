import axios from 'axios';
import API_BASE_URL from './config.js'; // API URL

// Tüm lisansları getir
export const getLisanslar = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Lisans`);
        return response.data;
    } catch (error) {
        console.error("API'den lisanslar alınırken hata oluştu:", error);
        throw error;
    }
};

// Yeni lisans ekle
export const addLisans = async (lisans) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/Lisans`, lisans);
        return response.data;
    } catch (error) {
        console.error("API'ye lisans eklenirken hata oluştu:", error);
        throw error;
    }
};

// Lisans güncelle
export const updateLisans = async (id, lisans) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/Lisans/${id}`, lisans);
        return response.data;
    } catch (error) {
        console.error("API'de lisans güncellenirken hata oluştu:", error);
        throw error;
    }
};

// Lisans sil (durumu false yap)
export const deleteLisans = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/Lisans/${id}`);
        return response.data;
    } catch (error) {
        console.error("API'de lisans silinirken hata oluştu:", error);
        throw error;
    }
};


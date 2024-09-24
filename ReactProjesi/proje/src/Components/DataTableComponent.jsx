import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { Dialog } from 'primereact/dialog';
import { deleteLisans, updateLisans, addLisans } from '../lisansService';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from "primereact/autocomplete";
import { InputMask } from "primereact/inputmask";

function DataTableComponent() {
    //State Yönetimi
    const [lisanslar, setLisanslar] = useState([]); //Lisans verilerini saklar
    const [globalFilterValue, setGlobalFilterValue] = useState(''); //Kullanıcının arama çubuğuna girdiği değeri saklar.
    const [filters, setFilters] = useState({ global: { value: null, matchMode: FilterMatchMode.CONTAINS }}); //Filtreler için
    const [isDialogVisible, setIsDialogVisible] = useState(false); // Güncelleme modalı görünürlüğü
    const [editingLisans, setEditingLisans] = useState(null); // Güncellenen lisans bilgileri
    const [isAddDialogVisible, setIsAddDialogVisible] = useState(false); // Ekleme modalı görünürlüğü
    const [newLisans, setNewLisans] = useState({}); // Yeni eklenecek lisans için veri tutma
    const [date, setDate] = useState(null);

//Bağlantı
    useEffect(() => { 
        const fetchData = async () => { 
            try {
                const response = await axios.get('https://localhost:7051/api/lisans');
                setLisanslar(response.data);
            } catch (error) {
                console.error('Veriler çekilirken hata oluştu:', error);
            }
        };
    
        fetchData();
    }, []);
//Arama
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

//Arama ve ekleme butonu
    const renderHeader = () => {
        return (
            <div className="header-container">
                <div className="search-container">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Lisanslar'da arayın" className="search-input"/>
                </div>
                <Button label="Lisans Ekle" icon="pi pi-plus" className="Add" onClick={() => setIsAddDialogVisible(true)}/>
            </div>
        );
    };
//Ekle
    const handleAdd = async () => {
        try {
            await addLisans(newLisans); // API'ye ekleme isteği gönder
            setLisanslar([...lisanslar, newLisans]); // Yeni lisansı mevcut listeye ekle
            setIsAddDialogVisible(false); 
            setNewLisans({}); 
        } catch (error) {
            console.error('Lisans eklenirken hata oluştu:', error);
        }
    };
//Sil
    const handleDelete = async (lisans) => {
        try {
            await deleteLisans(lisans.id);  // API'ye silme isteği 
            setLisanslar(lisanslar.filter(lisansItem => lisansItem.id !== lisans.id));  // Silinen lisanstan sonra tabloyu güncelle
        } catch (error) {
            console.error('Lisans silinirken hata oluştu:', error); 
        }
    };
    const confirmDelete = (rowData) => { 
        confirmDialog({ 
            message: 'Bu lisansı silmek istediğinizden emin misiniz?',
            header: 'Silme Onayı',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleDelete(rowData), 
            reject: () => setSelectedLisans(null) 

        });
    };
//Güncelle
    const openUpdateDialog = (rowData) => {
        setEditingLisans(rowData); 
        setIsDialogVisible(true); 
    };
    const handleInputChange = (e) => { 
        const { name, value } = e.target;
        setNewLisans((prevLisans) => ({
            ...prevLisans,
            [name]: value
        }));
        setEditingLisans((prevLisans) => ({ 
            ...prevLisans,
            [name]: value
        }));
    };
    const handleUpdateConfirm = async () => { 
        try {                                 
            await updateLisans(editingLisans.id, editingLisans);
            setLisanslar(lisanslar.map(lisans => lisans.id === editingLisans.id ? editingLisans : lisans));
            setIsDialogVisible(false); 
        } catch (error) {
            console.error('Lisans güncellenirken hata oluştu:', error);
        }
    };
//Her lisans için güncelle ve sil butonları     
    const actionBodyTemplate = (rowData) => {
        return (
            <div>
                <Button label="Sil" icon="pi pi-trash"style={{ marginBottom: '4px' }} className="Delete" onClick={() => confirmDelete(rowData)}/>
                <Button label="Güncelle" rounded className="Update" onClick={() => openUpdateDialog(rowData)}/>
            </div>
        );
    };

    const header = renderHeader();//Arama ve ekleme butonunu içerir
// Sıra numarası
    const indexTemplate = (rowData, options) => {
        return options.rowIndex + 1;
    };  
//Program adı için
    const programNames = ["Pixologic Zbrush", "3D-Coat", "Autodesk 3DS Max 2014", "CINEMA 4D Studio R19", "Allegorithmic Substance-painter", "Autodesk Maya", "Blender", "Adobe After Effects", "Nuke", "Adobe Premiere Pro"];
    const [filteredPrograms, setFilteredPrograms] = useState([]);
    const searchProgram = (event) => {
        const query = event.query.toLowerCase();
        const filtered = programNames.filter(name => name.toLowerCase().startsWith(query));
        setFilteredPrograms(filtered);
    }  

    return (
        <div className="table-container">
            <ConfirmDialog />
            <Dialog header="Lisans Güncelle" visible={isDialogVisible} style={{ width: '450px', maxHeight: '100vh', overflow: 'auto' }} modal onHide={() => setIsDialogVisible(false)}>
                <div className="p-grid">
                    <div className="p-col-4"><label htmlFor="programAdi">Program Adı</label></div>
                    <div className="p-col-8"><AutoComplete id="programAdi" name="programAdi" value={newLisans.programAdi || ''} suggestions={filteredPrograms} completeMethod={searchProgram} onChange={(e) => handleInputChange(e)}  />
                    </div>
                    <div className="p-col-4"><label htmlFor="sonKullanici">Son Kullanıcı</label></div>
                    <div className="p-col-8"><InputText id="sonKullanici" name="sonKullanici" value={editingLisans?.sonKullanici || ''} onChange={handleInputChange} />
                    </div>
                    <div className="p-col-4"><label htmlFor="depatman">Departman</label></div>
                    <div className="p-col-8"><InputText id="departman" name="departman" value={editingLisans?.departman || ''} onChange={handleInputChange} />
                    </div>
                    <div className="p-col-4"><label htmlFor="cihazReferans">Cihaz Referans</label></div>
                    <div className="p-col-8"><InputText id="cihazReferans" name="cihazReferans" value={editingLisans?.cihazReferans || ''} onChange={handleInputChange}/>
                    </div>
                    <div className="p-col-4"><label htmlFor="lisansAnahtari">Lisans Anahtarı</label></div>
                    <div className="p-col-8"><InputText id="lisansAnahtari" name="lisansAnahtari" value={editingLisans?.lisansAnahtari || ''} onChange={handleInputChange}/>
                    </div>
                    <div className="p-col-4"><label htmlFor="iletisimNo">İletişim No</label></div>
                    <div className="p-col-8"><InputMask id="iletisimNo" name="iletisimNo" mask="(999) 999-9999" value={newLisans.iletisimNo || ''} placeholder="(999) 999-9999" onChange={(e) => handleInputChange(e)} />
                    </div>
                    <div className="p-col-4"><label htmlFor="satinAlmaTarihi">Satın Alma Tarihi</label></div>
                    <div className="p-col-8"><InputText id="satinAlmaTarihi" name="satinAlmaTarihi" value={editingLisans?.satinAlmaTarihi || ''} onChange={handleInputChange}/>
                    </div>
                    <div className="p-col-4"><label htmlFor="firmaAdi">Firma Adı</label></div>
                    <div className="p-col-8"><InputText id="firmaAdi" name="firmaAdi" value={editingLisans?.firmaAdi || ''} onChange={handleInputChange}/>
                    </div>
                    <div className="p-col-4"><label htmlFor="lisansSuresi">Lisans Süresi</label></div>
                    <div className="p-col-8"><InputText id="lisansSuresi" name="lisansSuresi" value={editingLisans?.lisansSuresi || ''} onChange={handleInputChange}/>
                    </div>
                </div>
                <Button className="check" label="Güncelle" icon="pi pi-check" onClick={handleUpdateConfirm} />
            </Dialog> 
            <Dialog header="Lisans Ekle" visible={isAddDialogVisible} style={{ width: '450px', maxHeight: '100vh', overflow: 'auto' }} modal onHide={() => setIsAddDialogVisible(false)}>
                <div className="p-grid">
                    <div className="p-col-4"><label htmlFor="programAdi">Program Adı</label></div>
                    <div className="p-col-8"><AutoComplete className="auto" id="programAdi" name="programAdi" value={newLisans.programAdi || ''} suggestions={filteredPrograms} completeMethod={searchProgram} onChange={(e) => handleInputChange(e)} /></div>

                    <div className="p-col-4"><label htmlFor="sonKullanici">Son Kullanıcı</label></div>
                    <div className="p-col-8"><InputText id="sonKullanici" name="sonKullanici" value={newLisans.sonKullanici || ''} onChange={handleInputChange} /></div>

                    <div className="p-col-4"><label htmlFor="departman">Departman</label></div>
                    <div className="p-col-8"><InputText id="departman" name="departman" value={newLisans.departman || ''} onChange={handleInputChange} /></div>

                    <div className="p-col-4"><label htmlFor="cihazReferans">Cihaz Referans</label></div>
                    <div className="p-col-8"><InputText id="cihazReferans" name="cihazReferans" value={newLisans.cihazReferans || ''} onChange={handleInputChange} /></div>

                    <div className="p-col-4"><label htmlFor="lisansAnahtari">Lisans Anahtarı</label></div>
                    <div className="p-col-8"><InputText id="lisansAnahtari" name="lisansAnahtari" value={newLisans.lisansAnahtari || ''} onChange={handleInputChange} /></div>

                    <div className="p-col-4"><label htmlFor="iletisimNo">İletişim No</label></div>
                    <div className="p-col-8"><InputMask id="iletisimNo" name="iletisimNo" mask="(999) 999-9999" value={newLisans.iletisimNo || ''} placeholder="(999) 999-9999" onChange={(e) => handleInputChange(e)} /></div>

                    <div className="p-col-4"><label htmlFor="satinAlmaTarihi">Satın Alma Tarihi</label></div>
                    <div className="p-col-8"><Calendar id="satinAlmaTarihi" name="satinAlmaTarihi" value={newLisans.satinAlmaTarihi || ''} onChange={handleInputChange} dateFormat="dd/mm/yy" /></div>

                    <div className="p-col-4"><label htmlFor="firmaAdi">Firma Adı</label></div>
                    <div className="p-col-8"><InputText id="firmaAdi" name="firmaAdi" value={newLisans.firmaAdi || ''} onChange={handleInputChange} /></div>

                    <div className="p-col-4"><label htmlFor="lisansSuresi">Lisans Süresi</label></div>
                    <div className="p-col-8"><InputText id="lisansSuresi" name="lisansSuresi" value={newLisans.lisansSuresi || ''} onChange={handleInputChange} /></div>
                </div>
                <Button className="check" label="Kaydet" icon="pi pi-check" onClick={handleAdd} />
            </Dialog>
            <div className='card'>
            <DataTable value={lisanslar} scrollable scrollHeight="900px" paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '10rem' }}
                 filters={filters} filterDisplay="row" loading={false}
                globalFilterFields={['programAdi', 'sonKullanici', 'departman', 'cihazReferans', 'lisansAnahtari', 'iletisimNo', 'satinAlmaTarihi', 'firmaAdi', 'lisansSuresi']}
                header={header} emptyMessage="No data found.">
                <Column header="Sıra No" body={indexTemplate} style={{ width: '15%' }}></Column>
                <Column field="programAdi" header="Program Adı" style={{ width: '15%' }}></Column>
                <Column field="sonKullanici" header="Son Kullanıcı" style={{ width: '15%' }}></Column>
                <Column field="departman" header="Departman" style={{ width: '15%' }}></Column>
                <Column field="cihazReferans" header="Cihaz Referansı" style={{ width: '15%' }}></Column>
                <Column field="lisansAnahtari" header="Lisans Anahtarı" style={{ width: '15%' }}></Column>
                <Column field="iletisimNo" header="İletişim No" style={{ width: '15%' }}></Column>
                <Column field="satinAlmaTarihi" header="Satın Alma Tarihi" style={{ width: '15%' }}></Column>
                <Column field="firmaAdi" header="Firma Adı" style={{ width: '15%' }}></Column>
                <Column field="lisansSuresi" header="Lisans Süresi" style={{ width: '15%' }}></Column>
                <Column body={actionBodyTemplate} header="İşlemler" style={{ width: '15%' }}></Column>
            </DataTable>
            </div>
        </div>
    );
}

export default DataTableComponent;

import React from "react";
import { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { getInschrijvingen } from "../../../services/inschrijvingenService";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import InschrijvingPopup from "./inschrijvingPopup";
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';


const InschrijvingenAction = ({setAdminAction})=> {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [inschrijvingen, setInschrijvingen] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        tak: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [inschrijvingPopupActive, setInschrijvingPopupActive] = useState(false);

    const columns = [
        { field: 'geboortedatum', header: 'Geboortedatum' },
        { field: 'straatEnHuisnummer', header: 'Straat + Nr' },
        { field: 'gemeente', header: 'Gemeente' },
        { field: 'email', header: 'Email' },
        { field: 'gsmNummer', header: 'Gsm' },
    ];

    const [visibleColumns, setVisibleColumns] = useState([]);


    useEffect(() => {
        fetchInschrijvingenFunc();
    }, []);

    const fetchInschrijvingenFunc = () => {
        setIsPending(true);
        setError(null);
        getInschrijvingen().then((data) => {
            setInschrijvingen(data);
            console.log(data)
            setIsPending(false);
        }).catch((error) => {
            setError(error);
            setIsPending(false);
        });
    };

    const onColumnToggle = (event) => {
        let selectedColumns = event.value;
        let orderedSelectedColumns = columns.filter((col) => selectedColumns.some((sCol) => sCol.field === col.field));

        setVisibleColumns(orderedSelectedColumns);
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const exportToExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(inschrijvingen);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'inschrijvingen');
        });
    };

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end gap">
                <span className="p-input-icon-left">
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Zoeken..." />
                </span>
                <MultiSelect value={visibleColumns} options={columns} optionLabel="header" onChange={onColumnToggle} className="w-full sm:w-20rem" display="chip" />
                <span className="exportToExcel__container">
                    <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportToExcel} data-pr-tooltip="XLS" />
                    <span>Exporteer naar Excel</span>
                </span>
            </div>
        );
    };

    function formatDatabaseDateTime(dateTimeString) {
        const options = {
          timeZone: 'Europe/Brussels',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };
      
        const date = new Date(dateTimeString);
        return new Intl.DateTimeFormat('nl-NL', options).format(date);
      }

    const createdAtBodyTemplate = (rowData) => {
        const formattedDateTime = formatDatabaseDateTime(rowData.created_at);
      
        return (
          <div className="flex align-items-center gap-2">
            <span>{formattedDateTime}</span>
          </div>
        );
    };

    useEffect(() => {
        if (selectedRow) {
            setInschrijvingPopupActive(true);
        } else {
            setInschrijvingPopupActive(false);
        }
    }, [selectedRow]);

    return (
        <>
            <div className="admin__user">
                <h3 className="cursive adminLink" onClick={() => setAdminAction("")}>{"< Terug naar dashboard"}</h3>
            </div>
            <p>Hier kun je alle inschrijvingen zien en aanpassen</p>
            {error && <div className="error">{error.message}</div>}
            {!isPending && !error && 
            <>
                <p>Er zijn in totaal {inschrijvingen.length} leden ingeschreven</p>
                <DataTable 
                    value={inschrijvingen} 
                    tableStyle={{ minWidth: '50rem' }}
                    header={renderHeader}
                    paginator rows={20}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    sortMode="multiple"
                    removableSort
                    filters={filters} 
                    emptyMessage="Er zijn nog geen inschrijvingen"
                    selectionMode="single"
                    onSelectionChange={(e) => setSelectedRow(e.value)}
                    >
                    <Column field="voornaam" header="Voornaam" sortable></Column>
                    <Column field="achternaam" header="Achternaam" sortable></Column>
                    <Column field="tak" header="Tak" sortable></Column>
                    {visibleColumns.map((col) => (
                        <Column key={col.field} field={col.field} header={col.header} sortable/>
                    ))}
                    <Column field="created_at" body={createdAtBodyTemplate} header="Ingeschreven op" sortable></Column>
                </DataTable>
            </>
            }
            {isPending && <div>Loading...</div>}
            {inschrijvingPopupActive && <InschrijvingPopup onClose={() => setSelectedRow(null)} inschrijving={selectedRow}/>}
        </>
    );
}

export default InschrijvingenAction;
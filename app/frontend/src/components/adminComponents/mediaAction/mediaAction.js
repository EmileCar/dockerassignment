import React from "react";
import { useState, useEffect } from "react";
import { addMediaItem, fetchMediaItems, updateMediaItem } from "../../../services/mediaService";
import { Column } from 'primereact/column';
import { Image } from 'primereact/image';
import { DataTable } from 'primereact/datatable';
import { InputSwitch } from "primereact/inputswitch";
import MediaItemPopup from "./popups/MediaItemPopup";
import "./mediaAction.css";



const MediaAction = ({setAdminAction})=> {
    const [mediaItems, setMediaItems] = useState([]);
    const [addMediaItemActive, setAddMediaItemActive] = useState(false);
    const [isPending, setIsPending] = useState(false);


    const popupCloseHandler = (e) => {
        setAddMediaItemActive(null);
        fetchMediaItemsFunc();
    }

    useEffect(() => {
        fetchMediaItemsFunc();
    }, []);

    const fetchMediaItemsFunc = () => {
        setIsPending(true);
        fetchMediaItems().then((data) => {
            setMediaItems(data);
            setIsPending(false);
        }).catch((error) => {
            setIsPending(false);
        });
    };

    const renderPreview = (rowData) => {
        return (
            <Image preview zoomSrc={`assets/media/hoogtepunten/${rowData.fileName}`} src={`assets/media/hoogtepunten/${rowData.fileName}`} alt={rowData.name} height="100" />
        )
    }

    const renderActive = (rowData) => {
        return (
            <InputSwitch checked={rowData.active === 1} onChange={(e) => {updateMediaItemActive(e, rowData)}} />
        )
    }

    const updateMediaItemActive = (e, rowData) => {
        setIsPending(true);
        console.log(e.value)
        const updatedMediaItem = {
            id: rowData.id,
            name: rowData.name,
            fileName: rowData.fileName,
            active: e.value == false ? 0 : 1,
            date: rowData.date,
        };
        console.log(updatedMediaItem)
        updateMediaItem(updatedMediaItem).then((response) => {
            setIsPending(false);
            fetchMediaItemsFunc();
        }).catch((error) => {
            setIsPending(false);
            console.log(error);
        });
    }

    return (
        <>
            <div className="admin__user">
                <h3 className="cursive adminLink" onClick={() => setAdminAction("")}>{"< Terug naar dashboard"}</h3>
            </div>
            <p>Hier voeg je fotos toe aan de hoogtepunten sectie van de media pagina</p>
            <button className="button inherit-font submit-button" onClick={() => setAddMediaItemActive(true)}>Voeg hoogtepunt toe</button>
            {
                addMediaItemActive && 
                    <MediaItemPopup
                        onClose={popupCloseHandler}
                        title="Media item toevoegen"
                        mediaItem={null}
                        isPending={isPending}
                    />
                    
            }
            <DataTable
                value={mediaItems}
                className="p-datatable-striped"
                emptyMessage="Geen media items gevonden"
                loading={isPending}
            >
                <Column header="Afbeelding" body={renderPreview}></Column>
                <Column field="name" header="Naam"></Column>
                <Column field="date" header="Datum"></Column>
                <Column body={renderActive} header="Zichtbaar"></Column>
            </DataTable>
        </>
    );
}

export default MediaAction;
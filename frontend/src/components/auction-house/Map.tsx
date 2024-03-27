'use client'

import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

interface Location {
    x: number;
    y: number;
}
interface MapProps {
    location: Location;
}

const Map: React.FC<MapProps> = ({ location }) => {

    const containerStyle = {
        width: '100%',
        height: '200px'
    };
    
    const center = {
        lat: location.x,
        lng: location.y
    };
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCcTwD5Ct7hXkxHRrs8kcyaw1lvAedFEGs"
    });

    const [map, setMap] = React.useState<google.maps.Map | null>(null); // Xác định kiểu dữ liệu của map

    const onLoad = React.useCallback(function callback(map: google.maps.Map) { // Thêm kiểu dữ liệu cho map
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) { // Thêm kiểu dữ liệu cho map
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : <></>;
}

export default React.memo(Map);

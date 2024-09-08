import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

export default function Map(props) {
    const { handleMap, lantLong, techLocation } = props;

    const [mapState, setMapState] = useState({
        pickupCords: {
            latitude: parseFloat(techLocation?.lat) || 0,
            longitude: parseFloat(techLocation?.long) || 0,
        },
        dropCords: {
            latitude: parseFloat(lantLong?.lat) || 0,
            longitude: parseFloat(lantLong?.long) || 0,
        },
    });

    const GOOGLE_MAPS_APIKEY = "AIzaSyBvWULhEJHD7GpeeY3UC2C5N9dJZOIuyEg"; // Replace with your actual Google Maps API key
    const mapRef = useRef();

    useEffect(() => {
        
        const interval = setInterval(() => {
            if (!techLocation?.lat || !techLocation?.long || !lantLong?.lat || !lantLong?.long) {
                Alert.alert("Error", "Invalid location coordinates provided.");
            }
        }, 2000);

   
        return () => clearInterval(interval);
    },  []);
// console.log("techLocation",techLocation);

    if (!techLocation?.lat || !techLocation?.long || !lantLong?.lat || !lantLong?.long) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={{ color: "red" }}>Invalid coordinates provided.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={handleMap}>
                <Text style={{ color: "white" }}>Back</Text>
            </TouchableOpacity>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                    latitude: mapState.pickupCords.latitude,
                    longitude: mapState.pickupCords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={mapState.pickupCords} />
                <Marker coordinate={mapState.dropCords} />
                <MapViewDirections
                    origin={mapState.pickupCords}
                    destination={mapState.dropCords}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    optimizeWaypoints={true}
                    onReady={result => {
                        mapRef.current.fitToCoordinates(result.coordinates, {
                            edgePadding: { right: 30, bottom: 300, left: 30, top: 100 },
                        });
                    }}
                    onError={(errorMessage) => {
                        console.log('MapViewDirections Error:', errorMessage);
                    }}
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

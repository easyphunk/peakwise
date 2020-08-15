import React from 'react';
import mapboxgl from 'mapbox-gl';
import styles from './index.module.css';

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

class TripMap extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            lat: this.props.lat,
            lng: this.props.lng,
            zoom: this.props.zoom,
            pin: this.props.pin
        };
    }

    componentDidMount() {
        this._isMounted = true;

        const pin = {
            lat: this.props.lat,
            lng: this.props.lng
        }
        
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
        
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
        
        if (this.state.pin) {
            map.on('load', function () {
                new mapboxgl.Marker()
                .setLngLat([pin.lng, pin.lat])
                .addTo(map);
            });
        }
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <div>
                <div className={styles.sidebarStyle}>
                    <div>Latitude: {this.state.lat} | Longitude: {this.state.lng} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className={styles.mapContainer} />
            </div>
        )
    }
}

export default TripMap;
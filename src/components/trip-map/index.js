import React from 'react';
import mapboxgl from 'mapbox-gl';
import styles from './index.module.css';

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_TOKEN}`;

class TripMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: this.props.lat,
            lng: this.props.lng,
            zoom: this.props.zoom
        };
    }

    componentDidMount() {
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

        map.on('load', function () {
            map.loadImage(
                '/pin.png',
                function (error, image) {
                    if (error) throw error;
                    map.addImage('pin', image);
                    map.addSource('point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': [
                                {
                                    'type': 'Feature',
                                    'geometry': {
                                        'type': 'Point',
                                        'coordinates': [pin.lng, pin.lat]
                                    }
                                }
                            ]
                        }
                    });
                    map.addLayer({
                        'id': 'points',
                        'type': 'symbol',
                        'source': 'point',
                        'layout': {
                            'icon-image': 'pin',
                            'icon-size': 0.07
                        }
                    });
                }
            );
        });
    }

    render() {
        return (
            <div>
                <div className={styles.sidebarStyle}>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <div ref={el => this.mapContainer = el} className={styles.mapContainer} />
            </div>
        )
    }
}

export default TripMap;
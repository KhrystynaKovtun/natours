/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2hyeXN0eW5hLWtvdnR1biIsImEiOiJja2d4Y2tscHMwNm9nMzFwZGdxNHI3eHY5In0.u1Ij9LLFQTR4nVe90hmBsg';
  // mapboxgl.accessToken = 'pk.eyJ1Ijoia2hyeXN0eW5hLWtvdnR1biIsImEiOiJja2d4Y25kbmgwaW1mMnlwZnNhcG5nZ3lpIn0.9saLVVC7v48_gNk4eWzMjw';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/khrystyna-kovtun/ckgxfbxil2yo419ngbp77lzs4',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

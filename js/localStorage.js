//фнк-ция сохранения в локал сторадж
export function saveToLocalStorage(deliveries) {
    const serialization = deliveries.map(delivery => ({
        name: delivery.name,
        address: delivery.address,
        distance: delivery.distance,
        status: delivery.status || 'delivery'
    }));
    localStorage.setItem('deliveries', JSON.stringify(serialization));
}
//фнк-ция загрузки из локал сторадж
export function loadFromLocalStorage(DeliveryConstructor) {
    const saved = localStorage.getItem('deliveries');
    if(!saved) return [];

    try {
        const parsed = JSON.parse(saved);
        return parsed.map(item => 
            new DeliveryConstructor(
                item.name, 
                item.address, 
                item.distance, 
                item.status || 'delivery'
            )
        );
    } catch (e) {
        console.error('Ошибка при загрузке из LocalStorage', e);
        return [];
    }
}
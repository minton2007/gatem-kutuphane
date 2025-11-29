// Şifre: okulkutuphane
const SECRET_PASSWORD = "gatem1962"; 

// 1. Durumu Ekranda Gösterme İşlevi
function displayStatus(currentStatus) {
    const statusTextElement = document.getElementById('status-text');
    const statusBoxElement = document.getElementById('status-box');

    // Firebase'den gelen veri yoksa varsayılan 'closed'
    const status = currentStatus || 'closed'; 

    statusTextElement.textContent = status === 'open' ? 'AÇIK' : 'KAPALI';
    
    // Arka plan rengini duruma göre ayarla
    if (status === 'open') {
        statusBoxElement.className = 'status-box open';
    } else {
        statusBoxElement.className = 'status-box closed';
    }
}

// 2. Şifreli Değiştirme Sistemi ve Firebase'e Kaydetme
function changeStatus() {
    const enteredPassword = prompt("Durumu değiştirmek için şifreyi girin:");
    
    // Şifre kontrolü
    if (enteredPassword === SECRET_PASSWORD) {
        // Doğru şifre girildi, mevcut durumu Realtime Database'den bir kere oku
        statusRef.once('value')
            .then((snapshot) => {
                const currentStatus = snapshot.val() || 'closed';
                const newStatus = currentStatus === 'open' ? 'closed' : 'open';
                
                // Yeni durumu Firebase'e yaz
                return statusRef.set(newStatus)
                       .then(() => newStatus); // Yeni durumu döndür
            })
            .then((newStatus) => {
                alert(`Kütüphane durumu başarıyla ayarlandı. Yeni durum: ${newStatus === 'open' ? 'AÇIK' : 'KAPALI'}`);
                // displayStatus, Firebase dinleyicisi sayesinde otomatik çalışacaktır.
            })
            .catch((error) => {
                console.error("Durum değiştirme hatası: ", error);
                alert("Durum değiştirilirken bir hata oluştu.");
            });
    } else if (enteredPassword !== null) {
        // Yanlış şifre
        alert("Yanlış şifre! Durum değiştirilemedi.");
    }
}

// Sayfa yüklendiğinde durumu Firebase'den dinlemeye başla (Real-time güncelleme)
document.addEventListener('DOMContentLoaded', () => {
    
    // Firebase'deki veri her değiştiğinde (herkes değiştirdiğinde) bu fonksiyon çalışır!
    statusRef.on('value', (snapshot) => {
        const currentStatus = snapshot.val();
        displayStatus(currentStatus);
    });
    
    // Değiştir butonuna tıklama olayını bağla
    document.getElementById('change-button').addEventListener('click', changeStatus);
});



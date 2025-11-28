// Güvenliğiniz için bu şifreyi basit tutmayın ve gerçek projede daha güvenli bir yöntem kullanın!
const SECRET_PASSWORD = "okulkutuphane"; 
const STATUS_KEY = "libraryStatus"; // Durumu kaydetmek için kullanılacak anahtar

// 1. Durumu Tarayıcıda Kaydetme ve Yükleme İşlevleri
function saveStatus(status) {
    // Durumu kullanıcının tarayıcısına kaydeder (Bu, her kullanıcı için ayrı çalışır!)
    localStorage.setItem(STATUS_KEY, status); 
    displayStatus(); // Kaydettikten sonra hemen gösterimi güncelle
}

function loadStatus() {
    // Kayıtlı durumu yükler, eğer yoksa varsayılan olarak 'Kapalı' (closed) döner
    return localStorage.getItem(STATUS_KEY) || 'closed'; 
}

// 2. Durumu Ekranda Gösterme İşlevi
function displayStatus() {
    const currentStatus = loadStatus();
    const statusTextElement = document.getElementById('status-text');
    const statusBoxElement = document.getElementById('status-box');

    statusTextElement.textContent = currentStatus === 'open' ? 'AÇIK' : 'KAPALI';
    
    // Arka plan rengini duruma göre ayarla
    if (currentStatus === 'open') {
        statusBoxElement.className = 'status-box open';
    } else {
        statusBoxElement.className = 'status-box closed';
    }
}

// 3. Şifreli Değiştirme Sistemi İşlevi
function changeStatus() {
    // Kullanıcıdan şifreyi iste
    const enteredPassword = prompt("Durumu değiştirmek için şifreyi girin:");
    
    // Şifre kontrolü
    if (enteredPassword === SECRET_PASSWORD) {
        // Doğru şifre girildi, mevcut durumu tersine çevir
        const currentStatus = loadStatus();
        const newStatus = currentStatus === 'open' ? 'closed' : 'open';
        saveStatus(newStatus);
        alert(`Kütüphane durumu başarıyla "${newStatus === 'open' ? 'AÇIK' : 'KAPALI'}" olarak ayarlandı.`);
    } else if (enteredPassword !== null) {
        // Kullanıcı iptal etmediyse ve yanlış şifre girdiyse
        alert("Yanlış şifre! Durum değiştirilemedi.");
    }
}

// Sayfa yüklendiğinde durumu göster
document.addEventListener('DOMContentLoaded', () => {
    displayStatus();
    
    // Değiştir butonuna tıklama olayını bağla
    document.getElementById('change-button').addEventListener('click', changeStatus);
});

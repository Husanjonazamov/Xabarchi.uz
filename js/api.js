// Ma'lumotlarni olish va sahifada ko'rsatish funksiyasi
function fetchData() {
    const apiUrl = 'http://localhost:8000/api/v1/article/'; // O'z API manzilingizni kiriting

    fetch(apiUrl) // API'ga so'rov yuborish
        .then(response => {
            if (!response.ok) { // Javob muvaffaqiyatli kelganligini tekshirish
                throw new Error('Network response was not ok');
            }
            return response.json(); // JSON formatida ma'lumotlarni olish
        })
        .then(data => {
            // Ma'lumotlarni ko'rsatish uchun div elementini tanlab olish
            const dataContainer = document.getElementById('data-container');

            // Ma'lumotlarni HTML shaklida yaratish
            let htmlContent = '';
            data.forEach(item => {
                // Postdagi har bir tag'ni birlashtirish
                const tags = item.tags.map(tag => `<span class="tag">${tag.name}</span>`).join(', ');

                // Agar rasm bo'lsa, uni qo'shish
                const images = item.images.map(image => `<img src="${image.images}" alt="Image for ${item.title}" width="100" />`).join(' ');

                // Ma'lumotlarni HTML formatida qo'shish
                htmlContent += `
            <div class="post">
              <h2>${item.title}</h2>
              <p>${item.content}</p>
              <p><strong>Category:</strong> ${item.category.name}</p>
              <p><strong>Tags:</strong> ${tags}</p>
              <p><strong>Published:</strong> ${item.is_published ? 'Yes' : 'No'}</p>
              <p><strong>Created At:</strong> ${new Date(item.created_at).toLocaleString()}</p>
              <div class="images">${images}</div>
              <hr>
            </div>
          `;
            });

            // Divning ichki HTML kodini yangilash
            dataContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Fetch operationda xatolik yuz berdi:', error);
        });
}

// Funksiyani chaqirish
fetchData();

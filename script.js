document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("search-btn");
    const softwareList = document.getElementById("software-list"); // `category.html`
    const popularSoftware = document.getElementById("popular-software"); // `index.html`

    // 讀取 JSON 檔案並初始化
    fetch(`data.json?t=${new Date().getTime()}`)
    .then(response => response.json())
    .then(data => {
        console.log("✅ 成功讀取最新 JSON:", data);
        initPage(data);
    })
    .catch(error => console.error("❌ 讀取 JSON 失敗:", error));

        function initPage(data) {
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get("search");
            const categoryType = urlParams.get("type");
            const categoryTitle = document.getElementById("category-title");
        
            if (searchQuery) {
                // 設定標題為搜尋結果
                if (categoryTitle) categoryTitle.textContent = `搜尋結果：「${searchQuery}」`;
        
                // 過濾軟體列表
                const filteredData = data.filter(software =>
                    software.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    software.category.toLowerCase().includes(searchQuery.toLowerCase())
                );
                renderSoftware(filteredData, softwareList);
            } else if (categoryType) {
                // 設定標題為分類名稱
                if (categoryTitle) categoryTitle.textContent = `分類：${categoryType}`;
        
                // 過濾對應類別
                const filteredData = data.filter(software => software.category === categoryType);
                renderSoftware(filteredData, softwareList);
            } else {
                // 預設標題（防止空白）
                if (categoryTitle) categoryTitle.textContent = "所有軟體";
                renderSoftware(data, softwareList);
            }
        }
        

        function renderSoftware(data, targetElement) {
            if (!targetElement) {
                console.error("❌ 錯誤: 找不到要渲染的目標元素");
                return;
            }
        
            targetElement.innerHTML = "";
            if (data.length === 0) {
                targetElement.innerHTML = `<p style="text-align:center;">找不到符合條件的軟體。</p>`;
                return;
            }
        
            data.forEach(software => {
                const div = document.createElement("div");
                div.classList.add("software-item");
                div.innerHTML = `
                    <img src="${software.logo}" alt="${software.name} Logo" class="software-logo">
                    <h2>${software.name}</h2>
                    <p>${software.description}</p>
                    <div class="button-group">
                        <a href="${software.website}" target="_blank"><i class="fa-solid fa-globe"></i>官方網站</a>
                        <a href="${software.download}" target="_blank"><i class="fa-solid fa-download"></i>下載</a>
                    </div>
                `;
                targetElement.appendChild(div);
            });
        }
        

    // 搜尋功能
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query.toLowerCase() === "all") {
            // 直接跳轉到 category.html，不帶搜尋參數
            window.location.href = "category.html";
        } else if (query) {
            window.location.href = `category.html?search=${query}`;
        }
        
    });

    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchBtn.click();
        }
    });

    // 分類跳轉
    window.goToCategory = function(category) {
        window.location.href = `category.html?type=${encodeURIComponent(category)}`;
    };
});



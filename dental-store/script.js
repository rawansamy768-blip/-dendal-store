   const products = [
    { id: 1, title: "Zirconia Multi-Layer Crown Block", category: "prosthetics", price: 185.00, image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600", desc: "High translucency CAD/CAM zirconia material for aesthetic anterior & posterior restorations.", specs: "Material: 3Y-TZP Zirconia | Strength: 1200 MPa | Translucency: 43%" },
    { id: 2, title: "Titanium Implant Abutment", category: "prosthetics", price: 120.00, image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600", desc: "Precision-milled medical Grade 5 titanium abutment with superior biocompatibility.", specs: "Grade 5 Titanium | Hex Connection | Autoclavable up to 134°C" },
    { id: 3, title: "Porcelain Veneers Starter Kit", category: "prosthetics", price: 340.00, image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600", desc: "Ultra-thin pressable ceramic ingots for natural smile makeovers.", specs: "Lithium Disilicate Ceramic | Flexural Strength: 400 MPa" },
    { id: 4, title: "Custom Acrylic Denture Teeth Set", category: "prosthetics", price: 85.00, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600", desc: "Multi-layer synthetic polymer acrylic teeth with high wear resistance.", specs: "4 Layers Structure | Vita Shade Guide Matching" },
    { id: 5, title: "Surgical Extraction Forceps (10 Pcs)", category: "tools", price: 295.00, image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600", desc: "German stainless steel extraction forceps with anti-slip ergonomic handles.", specs: "German AISI 420 Stainless Steel | Corrosion Resistant" },
    { id: 6, title: "Microsurgical Scalpel Kit", category: "tools", price: 150.00, image: "https://images.unsplash.com/photo-1606811841689-23dfddce6395?auto=format&fit=crop&q=80&w=600", desc: "Titanium handles with interchangeable ultra-sharp surgical blades.", specs: "Includes 50 Stainless Steel Blades | Featherweight Titanium Handle" },
    { id: 7, title: "Dental Root Extraction Elevators", category: "tools", price: 175.00, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600", desc: "Straight and angled apical elevators crafted for atraumatic extraction.", specs: "Set of 6 Pcs | Non-Reflective Satin Finish" },
    { id: 8, title: "Orthodontic Pliers Set", category: "tools", price: 210.00, image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600", desc: "Tungsten carbide tip wire bending pliers for orthodontics.", specs: "Tungsten Carbide Inlays | Precision Box Joint" },
    { id: 9, title: "LED High-Speed Handpiece", category: "equipment", price: 320.00, image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600", desc: "Triple water spray, ceramic bearings with fiber optic LED light.", specs: "Speed: 350,000 RPM | Push Button Chuck | Noise Level < 60dB" },
    { id: 10, title: "Ultrasonic Scaler Unit", category: "equipment", price: 450.00, image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600", desc: "Automatic frequency tracking scaler with detachable LED handpiece.", specs: "Frequency: 28kHz - 30kHz | Power Output: 3W to 20W" },
    { id: 11, title: "Cordless LED Curing Light", category: "equipment", price: 230.00, image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600", desc: "High-intensity blue light curing device with multiple timer settings.", specs: "Light Output: 2300 mW/cm² | Wavelength: 385-515 nm" },
    { id: 12, title: "Universal Nano-Hybrid Composite", category: "care", price: 95.00, image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600", desc: "Light-cure aesthetic restorative composite kit in shade scales.", specs: "4 Syringes (A1, A2, A3, B1) | Radiopaque Resin" }
];

const categories = [
    { id: "all", label: "All Items" },
    { id: "prosthetics", label: "Prosthetics & Crowns" },
    { id: "tools", label: "Surgical Tools" },
    { id: "equipment", label: "Clinic Equipment" },
    { id: "care", label: "Dental Care Materials" }
];

let cart = [];
let activeCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderProducts();
    document.getElementById("cart-btn").addEventListener("click", openCart);
});

function renderCategories() {
    const container = document.getElementById("category-pills");
    if (!container) return;
    container.innerHTML = categories.map(c => `
        <button onclick="selectCategory('${c.id}')" class="px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeCategory === c.id ? 'bg-cyan-600 text-white shadow' : 'bg-slate-200/70 text-slate-700 hover:bg-slate-200'}">
            ${c.label}
        </button>
    `).join('');
}

function selectCategory(id) {
    activeCategory = id;
    renderCategories();
    filterProducts();
}

function filterProducts() {
    const searchInput = document.getElementById("search-input");
    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const filtered = products.filter(p => {
        const matchesCat = activeCategory === "all" || p.category === activeCategory;
        const matchesSearch = p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
        return matchesCat && matchesSearch;
    });
    renderProducts(filtered);
}

function renderProducts(items = products) {
    const grid = document.getElementById("products-grid");
    if (!grid) return;
    if (items.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12 text-slate-400">No matching dental products found.</div>`;
        return;
    }
    grid.innerHTML = items.map(p => `
        <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all cursor-pointer group" onclick="openDetailsModal(${p.id})">
            <div>
                <div class="h-48 bg-slate-100 overflow-hidden relative">
                    <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                    <span class="absolute top-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase">${p.category}</span>
                    <span class="absolute bottom-2 right-2 bg-white/90 text-slate-700 text-[10px] font-semibold px-2 py-1 rounded-md shadow"><i class="fa-solid fa-eye text-cyan-600 mr-1"></i> Details</span>
                </div>
                <div class="p-4">
                    <h3 class="font-bold text-slate-900 text-sm mb-1">${p.title}</h3>
                    <p class="text-slate-500 text-xs leading-relaxed line-clamp-2 mb-3">${p.desc}</p>
                </div>
            </div>
            <div class="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-auto pt-3" onclick="event.stopPropagation()">
                <span class="font-extrabold text-slate-900 text-lg">$${p.price.toFixed(2)}</span>
                <button onclick="addToCart(${p.id})" class="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow-md shadow-cyan-600/20">
                    <i class="fa-solid fa-plus"></i>
                    <span>Add</span>
                </button>
            </div>
        </div>
    `).join('');
}

/* Product Details Modal Logic */
function openDetailsModal(id) {
    const p = products.find(item => item.id === id);
    if (!p) return;

    const modalContent = document.getElementById("modal-content");
    modalContent.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6 items-center">
            <div class="h-64 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover">
            </div>
            <div class="space-y-4">
                <span class="px-2.5 py-1 bg-cyan-100 text-cyan-700 rounded-md text-xs font-bold uppercase tracking-wider">${p.category}</span>
                <h2 class="text-xl font-extrabold text-slate-900 leading-snug">${p.title}</h2>
                <p class="text-slate-600 text-sm leading-relaxed">${p.desc}</p>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 class="text-xs font-bold text-slate-800 mb-1"><i class="fa-solid fa-gear text-cyan-600 mr-1"></i> Technical Specs:</h4>
                    <p class="text-xs text-slate-500 font-mono">${p.specs}</p>
                </div>
                <div class="flex items-center justify-between pt-2">
                    <span class="text-2xl font-extrabold text-slate-900">$${p.price.toFixed(2)}</span>
                    <button onclick="addToCart(${p.id}); closeDetailsModal();" class="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold rounded-xl flex items-center space-x-2 shadow-lg shadow-cyan-600/20">
                        <i class="fa-solid fa-cart-plus text-sm"></i>
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("details-modal-backdrop").classList.remove("hidden");
}

function closeDetailsModal() {
    document.getElementById("details-modal-backdrop").classList.add("hidden");
}

/* Cart Logic */
function addToCart(id) {
    const item = products.find(p => p.id === id);
    const exist = cart.find(c => c.id === id);
    if (exist) { exist.qty += 1; } 
    else { cart.push({ ...item, qty: 1 }); }
    updateCart();
    openCart();
}

function updateQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
    }
    updateCart();
}

function updateCart() {
    const count = cart.reduce((acc, i) => acc + i.qty, 0);
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const badge = document.getElementById("cart-badge");
    const cartTotal = document.getElementById("cart-total");
    if (badge) badge.textContent = count;
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;

    const container = document.getElementById("cart-items");
    if (!container) return;
    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-slate-400 text-xs">Your cart is empty.</div>`;
        return;
    }
    container.innerHTML = cart.map(i => `
        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div class="flex items-center space-x-3">
                <img src="${i.image}" class="w-10 h-10 rounded-lg object-cover">
                <div>
                    <h4 class="text-xs font-bold text-slate-900 line-clamp-1">${i.title}</h4>
                    <p class="text-[11px] text-slate-500">$${i.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button onclick="updateQty(${i.id}, -1)" class="w-6 h-6 bg-white border border-slate-200 rounded text-xs font-bold">-</button>
                <span class="text-xs font-bold">${i.qty}</span>
                <button onclick="updateQty(${i.id}, 1)" class="w-6 h-6 bg-white border border-slate-200 rounded text-xs font-bold">+</button>
            </div>
        </div>
    `).join('');
}

function openCart() {
    document.getElementById("cart-drawer").classList.remove("translate-x-full");
    document.getElementById("cart-backdrop").classList.remove("hidden");
}

function closeCart() {
    document.getElementById("cart-drawer").classList.add("translate-x-full");
    document.getElementById("cart-backdrop").classList.add("hidden");
}

function checkout() {
    if (cart.length === 0) return alert("Your cart is empty!");
    alert("Order placed successfully! Our dental team will process your request.");
    cart = [];
    updateCart();
    closeCart();
}

function handleContactSubmit(e) {
    e.preventDefault();
    alert("Inquiry submitted successfully!");
    e.target.reset();
}
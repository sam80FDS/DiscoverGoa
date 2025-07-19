document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Sticky Header on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('#backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Tab Navigation for Attractions
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Load content for the active tab
            loadAttractions(tabId);
        });
    });
    
    // Attractions Data (hardcoded instead of JSON)
    const attractionsData = {
        beaches: [
            {
                name: "Calangute Beach",
                description: "Known as the 'Queen of Beaches', Calangute is the largest beach in North Goa, famous for its water sports and vibrant nightlife.",
                image: "https://media.istockphoto.com/id/690307150/photo/beach-in-goa-india.jpg?s=612x612&w=0&k=20&c=-9BkvnQ-APAnk6wKvOcGBssXvxyUV03loapRlorhJvY=",
                location: "North Goa",
                rating: 4.5
            },
            {
                name: "Palolem Beach",
                description: "A beautiful crescent-shaped beach in South Goa known for its calm waters, scenic beauty, and silent discos.",
                image: "https://share.google/IAh3reg6pn3Qmxhme",
                location: "South Goa",
                rating: 4.8
            },
            {
                name: "Anjuna Beach",
                description: "Famous for its Wednesday flea market and trance parties, Anjuna offers a unique hippie vibe and rocky shoreline.",
                image: "https://share.google/mHVINKbMryH1XAIKg",
                location: "North Goa",
                rating: 4.3
            }
        ],
        landmarks: [
            {
                name: "Basilica of Bom Jesus",
                description: "A UNESCO World Heritage Site that holds the mortal remains of St. Francis Xavier, known for its Baroque architecture.",
                image: "https://share.google/VsCTxJcUBNawQwmpQ",
                location: "Old Goa",
                rating: 4.7
            },
            {
                name: "Chapora Fort",
                description: "Popularly known as the 'Dil Chahta Hai' fort, it offers panoramic views of the Chapora River and surrounding beaches.",
                image: "https://share.google/W4aw2uUhoc0xXt8y5",
                location: "North Goa",
                rating: 4.4
            },
            {
                name: "Se Cathedral",
                description: "One of the largest churches in Asia, built to commemorate the victory of the Portuguese over a Muslim army.",
                image: "https://share.google/9iJ0Huao0nt1tq14f",
                location: "Old Goa",
                rating: 4.6
            }
        ],
        culture: [
            {
                name: "Goa Carnival",
                description: "A four-day non-stop extravaganza of music, dance, and colors held before Lent, showcasing Goa's Portuguese heritage.",
                image: "https://in.eventfaqs.com/wp-content/uploads/sites/2/2025/01/carnaval11.jpg",
                location: "Across Goa",
                rating: 4.9
            },
            {
                name: "Fontainhas",
                description: "The Latin Quarter of Panaji, known for its colorful Portuguese-style houses, art galleries, and cafes.",
                image: "https://share.google/KezlbNN4i4m2x5XDh",
                location: "Panaji",
                rating: 4.5
            },
            {
                name: "Mangeshi Temple",
                description: "One of the largest and most revered temples in Goa, dedicated to Lord Mangesh, an incarnation of Shiva.",
                image: "https://share.google/AciD5QVezKZO4WWqg",
                location: "Ponda",
                rating: 4.6
            }
        ],
        nature: [
            {
                name: "Dudhsagar Waterfalls",
                description: "One of India's tallest waterfalls, resembling a sea of milk as it cascades down the Western Ghats.",
                image: "https://t3.ftcdn.net/jpg/04/70/16/00/360_F_470160094_5nywvKDRwC7pMHgWAhSGOejWzBGL1uot.webp",
                location: "Sanguem",
                rating: 4.8
            },
            {
                name: "Cotigao Wildlife Sanctuary",
                description: "Goa's second largest wildlife sanctuary, home to diverse flora and fauna with treetop watchtowers for wildlife spotting.",
                image: "https://goa-tourism.org.in/images/places-to-visit/headers/cotigao-wildlife-sanctuary-goa-header-goa-tourism.jpg.jpg",
                location: "Canacona",
                rating: 4.4
            },
            {
                name: "Salim Ali Bird Sanctuary",
                description: "Named after India's most famous ornithologist, this sanctuary is a haven for migratory and resident birds.",
                image: "https://share.google/scak9SJrIXw0tNQKh",
                location: "Ribandar",
                rating: 4.2
            }
        ]
    };

    // Load Attractions
    function loadAttractions(category) {
        const container = document.getElementById(`${category}-container`);
        container.innerHTML = '';
        
        attractionsData[category].forEach(attraction => {
            const card = document.createElement('div');
            card.className = 'attraction-card';
            card.innerHTML = `
                <div class="attraction-img">
                    <img src="${attraction.image}" alt="${attraction.name}">
                </div>
                <div class="attraction-info">
                    <h3>${attraction.name}</h3>
                    <p>${attraction.description}</p>
                    <div class="attraction-meta">
                        <div class="attraction-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${attraction.location}</span>
                        </div>
                        <div class="attraction-rating">
                            ${generateStarRating(attraction.rating)}
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }
    
    function generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    // Initialize beaches tab content
    loadAttractions('beaches');
    
    // Animated Counter for Statistics
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateCounters() {
        statValues.forEach(value => {
            const target = +value.getAttribute('data-count');
            const duration = 2000;
            const step = target / (duration / 16);
            
            let current = 0;
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                value.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
            }, 16);
        });
    }
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(document.querySelector('.statistics'));
    
    // Chart.js Implementation for Visitor Statistics
    const ctx = document.getElementById('visitorsChart').getContext('2d');
    const visitorsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Domestic Visitors (Millions)',
                data: [6.2, 6.8, 2.1, 3.5, 6.5],
                borderColor: '#FF6B6B',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.3,
                fill: true
            }, {
                label: 'International Visitors (Millions)',
                data: [0.8, 0.9, 0.2, 0.3, 0.7],
                borderColor: '#4ECDC4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Visitors (Millions)'
                    }
                }
            }
        }
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    document.querySelector('.slider-next').addEventListener('click', () => {
        let nextSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(nextSlide);
    });
    
    document.querySelector('.slider-prev').addEventListener('click', () => {
        let prevSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(prevSlide);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Itinerary Planner Form
    const formSteps = document.querySelectorAll('.form-step');
    const plannerSteps = document.querySelectorAll('.planner-steps .step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const itineraryForm = document.getElementById('itineraryForm');
    const itineraryResult = document.getElementById('itineraryResult');
    
    let currentStep = 0;
    
    function updateFormSteps() {
        formSteps.forEach((step, index) => {
            if (index === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        plannerSteps.forEach((step, index) => {
            if (index <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }
    
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep < formSteps.length - 1) {
                currentStep++;
                updateFormSteps();
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                updateFormSteps();
            }
        });
    });
    
    plannerSteps.forEach((step, index) => {
        step.addEventListener('click', () => {
            if (index < currentStep) {
                currentStep = index;
                updateFormSteps();
            }
        });
    });
    
    itineraryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const duration = formData.get('duration');
        const interests = formData.getAll('interests');
        const budget = formData.get('budget');
        const travelers = formData.get('travelers');
        const season = formData.get('season');
        
        // Generate itinerary
        let itineraryHTML = `
            <h3>Your Personalized Goa Itinerary</h3>
            <p>Based on your preferences, here's a suggested ${duration}-day itinerary for ${travelers} traveler${travelers > 1 ? 's' : ''} visiting Goa in ${getSeasonName(season)}.</p>
            <div class="itinerary-days">
        `;
        
        for (let day = 1; day <= duration; day++) {
            itineraryHTML += `
                <div class="day-plan">
                    <h4><span>Day ${day}:</span> ${getDayTitle(day, interests)}</h4>
                    ${generateDayActivities(day, interests, budget)}
                </div>
            `;
        }
        
        itineraryHTML += `</div>`;
        itineraryResult.innerHTML = itineraryHTML;
        itineraryResult.style.display = 'block';
        
        // Scroll to results
        setTimeout(() => {
            itineraryResult.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
    
    function getSeasonName(season) {
        switch (season) {
            case 'winter': return 'winter (Nov-Feb)';
            case 'summer': return 'summer (Mar-May)';
            case 'monsoon': return 'monsoon season (Jun-Oct)';
            default: return season;
        }
    }
    
    function getDayTitle(day, interests) {
        if (day === 1) return 'Arrival & Exploration';
        if (day === 2 && interests.includes('beaches')) return 'Beach Hopping';
        if (day === 3 && interests.includes('history')) return 'Heritage Tour';
        if (day === 4 && interests.includes('nature')) return 'Nature Adventure';
        if (day === 5 && interests.includes('food')) return 'Culinary Experience';
        return 'Goa Exploration';
    }
    
    function generateDayActivities(day, interests, budget) {
        let activities = '';
        const budgetLevel = budget < 3000 ? 'budget' : budget < 5000 ? 'mid-range' : 'luxury';
        
        if (day === 1) {
            activities = `
                <div class="activity">
                    <div class="activity-time">Morning</div>
                    <div class="activity-details">
                        <h5>Arrival & Check-in</h5>
                        <p>Arrive at ${budgetLevel === 'luxury' ? 'Dabolim Airport with private transfer' : 'Madgaon Railway Station by train'}. Check into your ${budgetLevel} accommodation.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Afternoon</div>
                    <div class="activity-details">
                        <h5>Local Exploration</h5>
                        <p>Visit nearby ${interests.includes('history') ? 'heritage sites' : interests.includes('food') ? 'local eateries' : 'markets'} to get acquainted with Goa.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Evening</div>
                    <div class="activity-details">
                        <h5>Sunset & Relaxation</h5>
                        <p>Enjoy your first Goan sunset at ${interests.includes('nightlife') ? 'a beach shack with live music' : 'a quiet beach spot'}.</p>
                    </div>
                </div>
            `;
        } else if (day === 2 && interests.includes('beaches')) {
            activities = `
                <div class="activity">
                    <div class="activity-time">Morning</div>
                    <div class="activity-details">
                        <h5>Beach Exploration</h5>
                        <p>Visit ${budgetLevel === 'luxury' ? 'private beach clubs' : 'popular beaches'} like ${interests.includes('nightlife') ? 'Baga and Anjuna' : 'Palolem and Colva'}.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Afternoon</div>
                    <div class="activity-details">
                        <h5>Water Sports</h5>
                        <p>Try ${budgetLevel === 'budget' ? 'basic activities like jet skiing' : 'parasailing, banana boat rides, and scuba diving'}.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Evening</div>
                    <div class="activity-details">
                        <h5>Beachside Dining</h5>
                        <p>Enjoy fresh seafood at ${budgetLevel === 'luxury' ? 'a fine dining beachfront restaurant' : 'a local beach shack'}.</p>
                    </div>
                </div>
            `;
        } else if (day === 3 && interests.includes('history')) {
            activities = `
                <div class="activity">
                    <div class="activity-time">Morning</div>
                    <div class="activity-details">
                        <h5>Old Goa Heritage Walk</h5>
                        <p>Explore UNESCO sites like Basilica of Bom Jesus and Se Cathedral with ${budgetLevel === 'luxury' ? 'a private guide' : 'audio guide'}.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Afternoon</div>
                    <div class="activity-details">
                        <h5>Portuguese Influence</h5>
                        <p>Visit Fontainhas Latin Quarter and ${budgetLevel !== 'budget' ? 'have lunch at a heritage restaurant' : 'try local Goan snacks'}.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Evening</div>
                    <div class="activity-details">
                        <h5>Fort Sunset</h5>
                        <p>Watch sunset from ${interests.includes('nature') ? 'Chapora Fort' : 'Aguada Fort'} with panoramic views.</p>
                    </div>
                </div>
            `;
        } else if (day === 4 && interests.includes('nature')) {
            activities = `
                <div class="activity">
                    <div class="activity-time">Morning</div>
                    <div class="activity-details">
                        <h5>Dudhsagar Waterfalls</h5>
                        <p>${budgetLevel === 'luxury' ? 'Private jeep tour' : 'Shared jeep tour'} to the majestic waterfalls with swimming opportunity.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Afternoon</div>
                    <div class="activity-details">
                        <h5>Spice Plantation Tour</h5>
                        <p>Visit a working spice plantation with ${budgetLevel === 'luxury' ? 'gourmet Goan lunch' : 'traditional buffet lunch'} included.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Evening</div>
                    <div class="activity-details">
                        <h5>Backwater Cruise</h5>
                        <p>${budgetLevel === 'luxury' ? 'Private sunset cruise' : 'Group backwater boat tour'} through mangrove forests.</p>
                    </div>
                </div>
            `;
        } else if (day === 5 && interests.includes('food')) {
            activities = `
                <div class="activity">
                    <div class="activity-time">Morning</div>
                    <div class="activity-details">
                        <h5>Cooking Class</h5>
                        <p>Learn to make authentic Goan dishes like ${budgetLevel === 'luxury' ? 'prawn balchão and bebinca' : 'fish curry and rice'} at a local home.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Afternoon</div>
                    <div class="activity-details">
                        <h5>Market Tour</h5>
                        <p>Visit Mapusa or Margao market to see local produce and ${budgetLevel !== 'budget' ? 'buy spices to take home' : 'sample street food'}.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Evening</div>
                    <div class="activity-details">
                        <h5>Farewell Dinner</h5>
                        <p>Enjoy your last night at ${budgetLevel === 'luxury' ? 'a fine dining restaurant with Fado music' : 'a beachside shack with live music'}.</p>
                    </div>
                </div>
            `;
        } else {
            activities = `
                <div class="activity">
                    <div class="activity-time">Morning</div>
                    <div class="activity-details">
                        <h5>Free Time</h5>
                        <p>Explore at your own pace. We recommend ${interests.includes('beaches') ? 'visiting a new beach' : interests.includes('shopping') ? 'checking out local markets' : 'relaxing at your hotel'}.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Afternoon</div>
                    <div class="activity-details">
                        <h5>Optional Activities</h5>
                        <p>Choose from ${interests.includes('adventure') ? 'water sports, hiking' : interests.includes('culture') ? 'museum visits, art galleries' : 'spa treatments, yoga sessions'}.</p>
                    </div>
                </div>
                <div class="activity">
                    <div class="activity-time">Evening</div>
                    <div class="activity-details">
                        <h5>Sunset Experience</h5>
                        <p>${day == duration ? 'Final' : 'Another'} beautiful Goan sunset at ${interests.includes('nightlife') ? 'a popular beach club' : 'a quiet beach spot'}.</p>
                    </div>
                </div>
            `;
        }
        
        return activities;
    }
    
    // View More Photos Button
    document.getElementById('viewMoreBtn').addEventListener('click', function(e) {
        e.preventDefault();
        alert('In a complete implementation, this would load more gallery images or open a full gallery page.');
    });
    
    // Contact Form Submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
    
    // Newsletter Form Submission
    document.getElementById('newsletterForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
    
    // Initialize first tab and form step
    updateFormSteps();
});


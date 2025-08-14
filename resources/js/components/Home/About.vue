<!-- About -->
 <template>
    <section id="about" class="about">
        <div class="container my-5 py-5 px-4 ">
            <div class="row">
                <div class="col-md-6 col-lg-6 ">
                    <div>
                        <img 
                            :src="aboutImage" 
                            alt="Penda Graphics Logo - Professional Digital Design Company" 
                            class="w-100 rounded" 
                            style="height: 400px; object-fit: cover;"
                            loading="lazy"
                            width="400"
                            height="400"
                        >
                    </div>
                </div>
                <div class="col-md-6 col-lg-6">
                    <div class="about-content mt-5">
                        <h2 class="about-title fw-bold">About Us</h2>
                        <p>
                            Celebrated as the pinnacle of digital excellence in our city, Penda Graphics is a team of passionate professionals committed to crafting unparalleled digital experiences. 
                            We specialize in delivering innovative solutions and visually stunning, user-friendly websites tailored to the unique needs of our clients. 
                            With a strong focus on design, creativity, and cutting-edge technology, we elevate brands and leave a lasting impact through our unmatched expertise and dedication to quality.  
                        </p>
                        <a href="/about-us" class="btn btn-primary mt-2">Discover More</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        props: {
            aboutImage: String,
        }
    }
     
</script>
          

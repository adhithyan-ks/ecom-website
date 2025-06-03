import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutPage = () => {
    return (
        <>
            <Header />
            <main className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center text-amber-900 mb-6">About Urban Woods</h1>
                <p className="text-lg text-gray-700 mb-4">
                    At <strong>Urban Woods</strong>, we believe that furniture is more than just utility — it's a reflection of your lifestyle, values, and taste. Founded with a passion for craftsmanship and timeless design, we bring you premium quality wooden furniture that combines tradition with modern aesthetics.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    Every piece in our collection is thoughtfully designed and skillfully handcrafted from sustainably sourced wood. Whether you're furnishing a cozy apartment or a spacious home, our curated range includes everything from rustic coffee tables and elegant dining sets to minimalist shelves and sturdy beds.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    What sets us apart is our commitment to quality, sustainability, and customer satisfaction. We work directly with local artisans and use only eco-friendly finishes, ensuring our furniture not only lasts for generations but also respects the environment.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                    Join us in celebrating the beauty of wood, the soul of craftsmanship, and the charm of timeless design. Welcome to the warmth of <strong>Urban Woods</strong>.
                </p>
            </main>
            <Footer />
        </>
    );
};

export default AboutPage;
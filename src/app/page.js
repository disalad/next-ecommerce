import Benefits from '@/components/Home/Benefits';
import Subscribe from '@/components/Home/Subscribe';

function Home() {
    return (
        <section>
            <img
                src='/Cover.jpg'
                alt='Cover image'
                className='w-screen h-auto'
            />
            <Benefits />
            <Subscribe />
        </section>
    );
}

export default Home;

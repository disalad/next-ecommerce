import Benefits from '@/components/Home/Benefits';

function Home() {
    return (
        <section>
            <img
                src='/Cover.jpg'
                alt='Cover image'
                className='w-screen h-auto'
            />
            <Benefits />
        </section>
    );
}

export default Home;

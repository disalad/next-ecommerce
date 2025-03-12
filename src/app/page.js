import Benefits from '@/components/Home/Benefits';
import Subscribe from '@/components/Home/Subscribe';

function Home() {
    return (
        <section className='mx-auto'>
            <div className='w-full h-auto mx-auto bg-[#232323]'>
                <img
                    src='/Cover.jpg'
                    alt='Cover image'
                    className='w-full h-auto container mx-auto'
                />
            </div>
            <Benefits />
            <Subscribe />
        </section>
    );
}

export default Home;

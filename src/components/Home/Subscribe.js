function Subscribe() {
    return (
        <section className='subscribe'>
            <div className='container'>
                <div
                    style={{ backgroundImage: 'url(/subscribe.jpg)' }}
                    className='subscribe__content'
                >
                    <h4>
                        Subscribe to our newsletter and receive exclusive offers
                        every week
                    </h4>

                    <form className='subscribe__form'>
                        <input type='email' placeholder='Email address' />
                        <button
                            // type='submit'
                            className='btn rounded-full bg-yellow-500'
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Subscribe;

import { FaShippingFast } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { GoShieldLock } from 'react-icons/go';
import { AiOutlineProduct } from 'react-icons/ai';

function Benefits() {
    return (
        <section className='section mt-16'>
            <div className='container'>
                <header className='section__intro'>
                    <h4>Why should you choose us?</h4>
                </header>

                <ul className='shop-data-items'>
                    <li>
                        <span className='icon-container'>
                            <FaShippingFast className='icon' />
                        </span>
                        <div className='data-item__content'>
                            <h4>Free Shipping</h4>
                            <p>
                                All purchases over $199 are eligible for free
                                shipping via USPS First Class Mail.
                            </p>
                        </div>
                    </li>

                    <li>
                        <span className='icon-container'>
                            <MdPayment className='icon' />
                        </span>
                        <div className='data-item__content'>
                            <h4>Easy Payments</h4>
                            <p>
                                All payments are processed instantly over a
                                secure payment protocol.
                            </p>
                        </div>
                    </li>

                    <li>
                        <span className='icon-container'>
                            <GoShieldLock className='icon' />
                        </span>
                        <div className='data-item__content'>
                            <h4>Money-Back Guarantee</h4>
                            <p>
                                If an item arrived damaged or you've changed
                                your mind, you can send it back for a full
                                refund.
                            </p>
                        </div>
                    </li>

                    <li>
                        <span className='icon-container'>
                            <AiOutlineProduct className='icon' />
                        </span>
                        <div className='data-item__content'>
                            <h4>Finest Quality</h4>
                            <p>
                                Designed to last, each of our products has been
                                crafted with the finest materials.
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Benefits;

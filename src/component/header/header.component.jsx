import './header.style.css';
import Illustration  from '../../assets/hero-illustration.png';
import Button from '../button/button.component';
import { Link } from 'react-router-dom';
const Header = () => {
    return(
        <header>
            <section className='hero'>
                <div className='hero_text'>
                    <h4>999+ job listed</h4>
                    <h1>Find your dream job</h1>
                    <p>
                        We provide online instant cash loans with quick approval that suit your term length
                    </p>
                    {/* <a href='#list'> */}
                        <Button>start applying now</Button>
                    {/* </a> */}
                </div>
                <img className='hero-image' src={Illustration} alt='hero'/>
            </section>
        </header>
    )
}

export default Header;
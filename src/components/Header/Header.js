import './Header.css';

const Header = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return ( 
        <div onClick={scrollToTop} className="header">
            <span className="header-title">📺 Movies Trailer 🎬</span>
        </div>
     );
}
 
export default Header;
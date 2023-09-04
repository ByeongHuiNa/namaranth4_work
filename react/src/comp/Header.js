const Header = () =>{

    return (
        <div>
            <header className="navbar pcoded-header navbar-expand-lg navbar-light header-dark">
                <div className="m-header">
                    <a className="mobile-menu" id="mobile-collapse" href="#!"><span></span></a>
                    <a href="#!" className="b-brand">
                        <img src="./bootstrap/images/logow1.png" alt="" className="logo logoImg" style={{height:40}} />
                        <img src="./bootstrap/images/logo-icon.png" alt="" className="logo-thumb" />
                    </a>
                    <a href="#!" className="mob-toggler">
                        <i className="feather icon-more-vertical"></i>
                    </a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto center">
                        <li className="nav-item" >
                            <a href="#!" className="pop-search"><i className="feather icon-search"></i></a>
                            <div className="search-bar" >
                                <input type="text" className="form-control border-0 shadow-none" placeholder="Search hear" />
                                <button type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li>
                            <div className="dropdown drp-user center">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="feather icon-user"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right profile-notification">
                                    <div className="pro-head">
                                        <img src="./bootstrap/images/user/avatar-1.jpg" className="img-radius" alt="User-Profile-Image" />
                                        <span>John Doe</span>
                                        <a href="auth-signin.html" className="dud-logout" title="Logout">
                                            <i className="feather icon-log-out"></i>
                                        </a>
                                    </div>
                                    <ul className="pro-body">
                                        <li><a href="user-profile.html" className="dropdown-item"><i className="feather icon-user"></i> Profile</a></li>
                                        <li><a href="email_inbox.html" className="dropdown-item"><i className="feather icon-mail"></i> My Messages</a></li>
                                        <li><a href="auth-signin.html" className="dropdown-item"><i className="feather icon-lock"></i> Lock Screen</a></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        </div>

    );
}

export default Header;
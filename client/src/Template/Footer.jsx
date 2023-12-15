import React from 'react'

function Footer() {
    return (
        <footer className="flex flex-col bg-white-800 text-gray py-4 pt-8 mb-0 pb-0">
            <div className="flex flex-wrap justify-between items-center">
                <div className="mb-4">
                    <a href="/" className="flex items-center gap-2">

                        <span className="font-bold text-xl">Airbbb</span>
                    </a>
                    <p className="text-sm mt-2">
                        © Copyright 2023 Airbbb. All rights reserved.
                    </p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">Explore</h3>
                    <ul className="text-sm">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/about">About us</a>
                        </li>
                        <li>
                            <a href="/help">Help & Support</a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-lg">Contact</h3>
                    <ul className="text-sm">
                        <li>
                            <a href="#">Email us</a>
                        </li>
                        <li>
                            <a href="#">Call us</a>
                        </li>
                        <li>
                            <a href="#">Social media</a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr className="border-gray-700 mt-4" />
            <div className="flex justify-end mt-2">
                <a href="#">Terms & Conditions</a>
                <a href="#">Privacy Policy</a>
            </div>
        </footer>
    );
}

export default Footer;




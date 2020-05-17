import React from 'react';
import Message from '../../components/common/message';
import FooterLeftPane from './footerLeftPane';
import FooterCenterPane from './footerCenterPane';
import FooterRightPane from './footerRightPane';

const Footer = () => {
    return (
        <div className="footer padAround">
            <FooterLeftPane />
            <FooterCenterPane />
            <FooterRightPane />
            <Message />
        </div>
    );
};

export default Footer;

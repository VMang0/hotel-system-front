import React from 'react';
import "./Maps.css"
export default function YandexMap(){
    return(
        <div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2352.9062182782054!2d27.44910758042259!3d53.862315553461734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbdbb23303fa95%3A0xca6994fb5f36c4f0!2z0YPQuy4g0JHQtdC70LXRhtC60L7Qs9C-IDUwLCDQnNC40L3RgdC6!5e0!3m2!1sru!2sby!4v1681223905689!5m2!1sru!2sby"
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    );
}

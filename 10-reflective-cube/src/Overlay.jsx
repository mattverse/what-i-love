import React from 'react';
import './style.css'; // Make sure to use the correct path to your CSS file

const Overlay = () => {
    return (
        <div className="container">
            {/* <div className='top-quote'>
                Death is not an event in life: we do not live to experience death. If we take eternity to mean not infinite temporal duration but timelessness,
            </div> */}
            <div className='topRightContent'>
                {/* <div className='date-container'>
                    <div className='header'> DATE </div>
                    <div className='content'> Sat Mar 2</div>
                </div> */}
                <div className='memorial-container'>
                    <div className='header'>MEMORIAL OF</div>
                    <div className='content'>Wittgenstein</div>
                </div>
                <div></div>
            </div>


        </div>
    );
};

export default Overlay;

// export function Underlay() {
//     return (
//         <div
//             style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%",
//                 padding: 40,
//                 display: "inline-flex",
//                 flexDirection: "column",
//                 alignItems: "flex-start",
//                 justifyContent: "flex-start",
//                 pointerEvents: "none",
//             }}>
//             <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
//                 <p
//                     style={{
//                         fontFamily: "'Antonio', sans-serif",
//                         flex: "1 1 0%",
//                         height: 30,
//                         fontSize: 30,
//                         fontWeight: "700",
//                         lineHeight: "30px",
//                         color: "black",
//                         letterSpacing: -2,
//                     }}>
//                     POIMANDRES
//                 </p>
//                 <div style={{ flex: "1 1 0%", display: "flex", gap: "2em" }}></div>
//                 <p style={{ flex: "1 1 0%", height: 30, fontSize: 30, lineHeight: "30px", textAlign: "right", color: "black" }}>⎑</p>
//             </div>

//         </div>
//     )
// }
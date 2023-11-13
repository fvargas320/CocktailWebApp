// Cocktail.js
function Cocktail(props) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 m-2" onClick={console.log("HI")}>
            <img className="block mx-auto h-52 rounded sm:mx-0 sm:shrink-0" src={props.image} alt={props.name} />
            <p style={{ fontFamily: 'SFProRegular', color: "#000000", fontSize: "20px"}}>{props.name}</p>
            <p style={{ fontFamily: 'SFProRegular', color: "#8A8A8D", fontSize: "16px"}}>{props.flavor} Flavor</p>
        </div>
    );
}

export default Cocktail;

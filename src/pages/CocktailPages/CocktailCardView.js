// CocktailCardView.js
function CocktailCardView({ cocktail, onClose }) {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <img className="mx-auto h-24 rounded sm:mx-0 sm:shrink-0" src={cocktail.image_url} alt={`Cocktail ${cocktail.name}`} />
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{cocktail.name}</h3>
                    <div className="mt-2 px-4 py-2">
                        <p className="text-sm text-gray-500">{cocktail.description}</p>
                        {/* Add more cocktail details here */}
                    </div>
                </div>
                <div className="items-center px-4 py-3">
                    <button id="ok-btn" className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CocktailCardView;

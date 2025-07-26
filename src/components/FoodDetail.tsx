import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { foodItems } from '../data/foodItems';
import { Ingredient, CartItem } from '../types';
import { ArrowLeft, Mic, Type, Flame, Clock, ShoppingCart, Play, Pause, X } from 'lucide-react';
import WaiterButton from './WaiterButton';

const FoodDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [customIngredients, setCustomIngredients] = useState<Ingredient[]>([]);
  const [instructions, setInstructions] = useState('');
  const [instructionMode, setInstructionMode] = useState<'text' | 'voice'>('text');
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMobileAlert, setShowMobileAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [spiceLevel, setSpiceLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [sauceLevel, setSauceLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const foodItem = foodItems.find(item => item.id === id);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setShowMobileAlert(true);
  };

  React.useEffect(() => {
    if (foodItem) {
      setCustomIngredients([...foodItem.ingredients]);
    }
  }, [foodItem]);

  if (!foodItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Food item not found</p>
      </div>
    );
  }

  const updateIngredientLevel = (ingredientId: string, level: 'less' | 'medium' | 'high') => {
    setCustomIngredients(prev =>
      prev.map(ing => {
        if (ing.id === ingredientId && !ing.isMajor) {
          return { ...ing, level };
        }
        return ing;
      })
    );
  };

  const handleVoiceRecord = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
            sampleRate: 44100
          }
        });
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm;codecs=opus'
        });
        mediaRecorderRef.current = mediaRecorder;
        
        const chunks: BlobPart[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });
          setAudioBlob(blob);
          
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop());
          
          showAlert('Voice recording completed! You can now play it back.');
        };
        
        mediaRecorder.start();
        setIsRecording(true);
        
        // Auto-stop after 30 seconds
        setTimeout(() => {
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
          }
        }, 30000);
      } catch (error) {
        console.error('Error accessing microphone:', error);
        showAlert('Could not access microphone. Please check your permissions.');
      }
    }
  };

  const playRecording = () => {
    if (audioBlob && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const removeRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setAudioBlob(null);
    setIsPlaying(false);
  };

  const calculateTotalPrice = () => {
    const additionalPrice = customIngredients.reduce((total, ing) => {
      if (ing.price && ing.quantity > 0) {
        return total + (ing.price * ing.quantity);
      }
      return total;
    }, 0);
    return foodItem.price + additionalPrice;
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${foodItem.id}-${Date.now()}`,
      foodItem,
      quantity: 1,
      customIngredients,
      instructions: instructions || undefined,
      totalPrice: calculateTotalPrice(),
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    showAlert('Item added to cart successfully!');
    setTimeout(() => {
      navigate('/menu');
    }, 1500);
  };

  const toggleTopping = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(prev => prev.filter(t => t !== topping));
    } else {
      setSelectedToppings(prev => [...prev, topping]);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 shadow-sm transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-4 py-4">
          <div className="flex items-center gap-4">
          <button
              onClick={() => navigate(-1)}
              className={`p-2 rounded-full transition-colors ${state.darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
              <ArrowLeft className={`w-6 h-6 ${state.darkMode ? 'text-white' : 'text-gray-600'}`} />
          </button>
            <h1 className={`text-xl font-bold transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {foodItem.name}
          </h1>
          </div>
        </div>
      </div>

      {/* Food Image */}
      <div className="relative">
        <img
          src={foodItem.image}
          alt={foodItem.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Food Details */}
      <div className={`p-6 mx-4 rounded-t-3xl -mt-6 relative z-10 transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
          {foodItem.name}
        </h2>
        <p className={`mb-4 transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {foodItem.description}
        </p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {foodItem.calories} cal
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-5 h-5 text-gray-500" />
            <span className={`transition-colors duration-300 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              15-20 min
            </span>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className={`mx-4 p-6 mb-4 rounded-2xl shadow-sm transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
          Ingredients
        </h3>
        <div className="space-y-3">
          {customIngredients.map((ingredient) => (
            <div
              key={ingredient.id}
              className="flex items-center p-3 rounded-xl bg-[#DDEB9D]"
            >
              <span className="font-medium text-gray-800">
                  {ingredient.name}
                </span>
            </div>
          ))}
        </div>
      </div>

      {/* Customization Section */}
      <div className={`mx-4 p-6 mb-4 rounded-2xl shadow-sm transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
          Customize Your Order
        </h3>

        {/* Spice Level */}
        <div className="mb-6">
          <h4 className={`font-medium mb-3 transition-colors duration-300 ${state.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Spice Level
          </h4>
          <div className="flex gap-2">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setSpiceLevel(level as 'low' | 'medium' | 'high')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                  spiceLevel === level
                    ? 'bg-primary-dark text-white'
                    : state.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sauce Level */}
        <div className="mb-6">
          <h4 className={`font-medium mb-3 transition-colors duration-300 ${state.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Sauce Level
          </h4>
          <div className="flex gap-2">
            {['low', 'medium', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setSauceLevel(level as 'low' | 'medium' | 'high')}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                  sauceLevel === level
                    ? 'bg-primary-dark text-white'
                    : state.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Extra Toppings */}
        <div>
          <h4 className={`font-medium mb-3 transition-colors duration-300 ${state.darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Extra Toppings
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {['Extra Cheese', 'Extra Cream', 'Extra Mayonnaise', 'Extra Butter'].map((topping) => (
              <button
                key={topping}
                onClick={() => toggleTopping(topping)}
                className={`py-2 px-4 rounded-xl text-sm font-medium transition-colors ${
                  selectedToppings.includes(topping)
                    ? 'bg-primary-dark text-white'
                    : state.darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {topping}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions Section */}
      <div className={`mx-4 p-6 mb-24 rounded-2xl shadow-sm transition-colors duration-300 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h3 className={`text-xl font-bold mb-4 transition-colors duration-300 ${state.darkMode ? 'text-white' : 'text-primary-darker'}`}>
          Add Instructions <span className={`text-sm font-normal transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>(Optional)</span>
        </h3>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setInstructionMode('text')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              instructionMode === 'text'
                ? 'bg-primary-dark text-white'
                : state.darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Type className="w-4 h-4" />
            Text
          </button>
          <button
            onClick={() => setInstructionMode('voice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              instructionMode === 'voice'
                ? 'bg-primary-dark text-white'
                : state.darkMode 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Mic className="w-4 h-4" />
            Voice
          </button>
        </div>

        {instructionMode === 'text' ? (
          <textarea
            ref={textareaRef}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g., Use brown sugar, make it less spicy..."
            className={`w-full p-3 border-2 rounded-xl focus:outline-none resize-none transition-colors ${
              state.darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-primary-dark'
                : 'bg-white border-gray-200 text-gray-900 focus:border-primary-dark'
            }`}
            rows={3}
          />
        ) : (
          <div className={`border-2 border-dashed rounded-xl p-8 transition-colors ${
            state.darkMode ? 'border-gray-600' : 'border-gray-300'
          }`}>
            {!audioBlob ? (
              <div className="flex flex-col items-center justify-center">
              <button
                onClick={handleVoiceRecord}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                  isRecording
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : state.darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Mic className="w-5 h-5" />
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
                <p className={`mt-2 text-sm transition-colors duration-300 ${state.darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isRecording ? 'Recording... (max 30s)' : 'Click to record your instructions'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-4">
                  <button
                    onClick={isPlaying ? pauseRecording : playRecording}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-colors ${
                      state.darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Play
                      </>
                    )}
                  </button>
                  <button
                    onClick={removeRecording}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <audio ref={audioRef} src={URL.createObjectURL(audioBlob)} className="hidden" />
          </div>
        )}
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-white to-transparent dark:from-gray-800">
          <button
            onClick={handleAddToCart}
          className="w-full bg-primary-dark text-white py-4 rounded-xl font-semibold text-lg hover:bg-primary-darker transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
          Add to Cart - ₹{calculateTotalPrice()}
          </button>
      </div>

      {/* Mobile Alert */}
      {showMobileAlert && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg">
                  {alertMessage}
        </div>
      )}

      <WaiterButton />
    </div>
  );
};

export default FoodDetail;
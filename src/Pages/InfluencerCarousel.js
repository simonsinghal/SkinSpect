import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import inf1 from "../Images/inf1.png";
import inf2 from "../Images/inf2.png";
import inf3 from "../Images/inf3.png";
import inf4 from "../Images/inf4.png";

const InfluencerCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const influencers = [
    {
      name: 'Dr. Ankur Sarin',
      description: 'Hair Transplant Surgeon',
      image: inf1,
      followers: '723K',
      profileLink: 'https://www.instagram.com/drankursarin_sarinskin/', // Add profile link here
    },
    {
      name: 'Dr. Aanchal Panth',
      description: 'Dermatologist, Skin educator, myth buster.',
      image: inf2,
      followers: '630K',
      profileLink: 'https://www.instagram.com/dr.aanchal.md/', // Add profile link here
    },
    {
      name: 'Dr. Rashmi Shetty',
      description: 'Board-Certified Dermatologist',
      image: inf3,
      followers: '417K',
      profileLink: 'https://www.instagram.com/drrashmishettyra/', // Add profile link here
    },
    {
      name: 'Dr. Renita Rajan',
      description: 'Dermatologist',
      image: inf4,
      followers: '223K',
      profileLink: 'https://www.instagram.com/drrenitarajan/?hl=en', // Add profile link here
    },
  ];

  const handleProfileClick = (profileLink) => {
    if (profileLink) {
      window.open(profileLink, '_blank'); // Open the link in a new tab
    }
  };

  return (
    <Slider {...settings}>
      {influencers.map((influencer, index) => (
        <div key={index} className="p-4">
          <div className="border rounded-lg p-6 flex flex-col items-center" style={{ minHeight: '300px' }}>
            <img
              src={influencer.image}
              alt={influencer.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-center">{influencer.name}</h3>
            <p className="text-gray-600 text-center">{influencer.description}</p>
            <p className="text-gray-600 text-center">Followers: {influencer.followers}</p>
            <button
              className="bg-blue-500 rounded-md mt-4 w-20 text-center text-white"
              onClick={() => handleProfileClick(influencer.profileLink)}
            >
              Profile
            </button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default InfluencerCarousel;
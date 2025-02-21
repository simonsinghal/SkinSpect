import React, { useState } from "react";
import art1 from "../Images/art1.jpg";
import art2 from "../Images/art2.jpg";
import art3 from "../Images/art3.jpg";
import art4 from "../Images/art4.jpg";
import art5 from "../Images/art5.jpg";
import art6 from "../Images/art6.jpg";


const ArticleGrid = () => {
  const [showAllArticles, setShowAllArticles] = useState(false);

  const articles = [
    {
      title: "Unmasking Psoriasis: Beyond the Red Patches",
      description:
        "Psoriasis is more than just a skin condition; and is a complex autoimmune disease. Dive deep into understanding its triggers, latest treatments, and how to manage flare-ups effectively. Learn to live confidently with psoriasis.",
      image: art1,
      link: "https://www.niams.nih.gov/health-topics/psoriasis",
    },
    {
      title:
        "Eczema Explained: Soothing the Itch and Restoring Your Skin's Barrier",
      description:
        "Constant itching driving you crazy? We break down the science of eczema (atopic dermatitis), offering practical tips to calm inflammation, identify your triggers, and achieve lasting relief. Reclaim comfort and healthy skin.",
      image: art2,
      link: "https://nationaleczema.org/eczema/",
    },
    {
      title: "Acne Myths Debunked: Effective Strategies for Clearer Skin",
      description:
        "Stop believing the hype! From toothpaste remedies to harsh scrubs, we expose common acne myths and reveal dermatologist-approved strategies that actually work. Get ready for a clearer, healthier complexion.",
      image: art3,
      link: "https://www.google.com/search?q=https://www.aad.org/public/diseases/acne/acne-resource-center",
    },
    {
      title: "Skin Cancer: Early Detection and Lifesaving Habits",
      description:
        "Skin cancer is a serious concern, but knowledge is power. Learn how to perform self-exams, recognize early warning signs, and adopt sun-safe habits that can significantly reduce your risk. Protect your skin, protect your life.",
      image: art4,
      link: "https://www.wcrf.org/cancer-types/skin-cancer/",
    },
    {
      title:
        "Bacterial Skin Infections: Identifying and Treating Cellulitis and Impetigo",
      description:
        "Is that redness just a rash, or something more? Understand the difference between common bacterial infections like cellulitis and impetigo, learn how to identify them, and discover effective treatment options to prevent spread and complications.",
      image: art5,
      link: "https://www.nhs.uk/conditions/athletes-foot/",
    },
    {
      title: "Fungal Infections: Conquering Ringworm and Athlete's Foot",
      description:
        "Itchy, scaly, and persistent? Fungal infections are incredibly common, but also treatable. Learn to identify ringworm, athlete's foot, and other fungal foes, and discover the best over-the-counter and prescription solutions to get your skin back to health.",
      image: art6,
      link: "https://www.google.com/search?q=https://www.mayoclinic.org/diseases-conditions/shingles/symptoms-causes/syc-20353044",
    },
  ];

  const visibleArticles = showAllArticles ? articles : articles.slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {visibleArticles.map((article, index) => (
        <div key={index} className="border rounded-lg p-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
          <p className="text-gray-600 mb-4">{article.description}</p>
          <a
            href={article.link}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md inline-block"
          >
            Read More
          </a>
        </div>
      ))}
      {!showAllArticles && articles.length > 4 && (
        <div className="col-span-2 flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowAllArticles(true)}
          >
            View All
          </button>
        </div>
      )}
    </div>
  );
};

export default ArticleGrid;

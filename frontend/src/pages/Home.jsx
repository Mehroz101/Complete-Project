import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import ParkingFinderCard from "../components/ParkingFinderCard";
import userImg from "../assets/parkingZone.png";
import Footer from "../components/Footer";
import Partner1 from "../assets/partner-1.png";
import Partner2 from "../assets/partner-2.png";
import Partner3 from "../assets/partner-3.png";
import Partner4 from "../assets/partner-4.png";
import { useSetting } from "../context/WebsiteSetting";
import FindParkingHomeCard from "../components/FindParkingHomeCard";
import findLocationIcon from "../assets/search.png";
import reserveIcon from "../assets/reserved.png";
import payIcon from "../assets/booking.png";
import userFrinedlyIcon from "../assets/user-friendly.png";
import secureIcon from "../assets/shield.png";
import chooseIcon from "../assets/choice.png";
import availableIcon from "../assets/available.png";
import curveLine from "../assets/curveline.png";
import { Link } from "react-router-dom";

// import { getAllReviews, getSpaceReviews } from "../services/spaceService";
// import { reviewDateCalculator } from "../parkingOwner/components/Functions";
const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [height, setHeight] = useState("0px");
  const contentRef = useRef(null);
  const { siteSetting } = useSetting();
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  // const [reviews, setReviews] = useState([]);
  const words = ["Anywhere", "Anytime", "Effortlessly", "Smartly"];
  const speed = 150; // Typing speed in milliseconds

  const faqs = [
    {
      question: "How do I reserve a parking spot?",
      answer:
        "To reserve a parking spot, simply search for available spots in your area, select your desired time, and complete the payment. You'll receive a confirmation and instructions on how to access your reserved spot.",
    },
    {
      question: "How can I list my parking space for rent?",
      answer:
        'Listing your parking space is easy. Go to the "List Your Space" page, provide details about your spot, set your price, and publish your listing. Our platform will handle the rest!',
    },
    {
      question: "What if I need to cancel my reservation?",
      answer:
        "If you need to cancel, you can do so through your account dashboard. Depending on the cancellation policy of the spot owner, you may be eligible for a refund.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we use industry-standard encryption to ensure that your payment information is secure. Your data is protected with the highest levels of security.",
    },
  ];

  const handleClick = (index) => {
    if (activeIndex === index) {
      setHeight("0px");
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
      setHeight(`${contentRef.current.scrollHeight}px`);
    }
  };
  // const getReviews = async () => {
  //   const response = await getAllReviews();
  //   setReviews(response);
  // };
  // useEffect(() => {
  //   getReviews();
  // }, []);
  useEffect(() => {
    if (activeIndex === null) {
      setHeight("0px");
    }
  }, [activeIndex]);
  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentWord.length) {
          setIsDeleting(true);
        }
      } else {
        setText(currentWord.substring(0, charIndex));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const typingInterval = setInterval(handleTyping, speed);

    return () => clearInterval(typingInterval);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <>
      <Navbar siteName={siteSetting?.siteName || "Parkify"} />
      <div className="hero_sectionnew">
        <div className="hero_left">
          <h1>Find Your Perfect Parking Spot Anytime, Anywhere!</h1>
          <span>
            Book and reserve parking spaces hassle-free with our smart parking
            solution
          </span>
        </div>
        <div className="hero_right">
          <FindParkingHomeCard />
        </div>
      </div>
      {/* <div className="hero_section">
        <div className="hero_left">
          <ParkingFinderCard />
        </div>
        <div className="hero_right">
          <div className="here_right_text">
            <h1>
              Find Your Perfect Parking Spot <span> {text}</span>
            </h1>
            <p>
              Discover the convenience of finding and reserving parking spaces
              in advance. Whether you're heading to work, shopping, or an event,
              our smart parking solution makes it easy to secure a spot with
              just a few clicks.
            </p>
          </div>
        </div>
      </div> */}
      <div className="howtobook_container">
        <h2>How It Works?</h2>
        <p className="sporttext">
          Effortlessly explore, choose, and reserve your ideal parking spot in
          just a few clicks.
        </p>
        <div className="stepboxs">
          <div className="step_box">
            <div className="number">
              <img src={findLocationIcon} alt="" />
              {/* <i class="fa-solid fa-magnifying-glass-location"></i>{" "} */}
            </div>
            <div className="text">
              <h3>Explore Nearby Parking</h3>
              <p>
                Open our platform and instantly view available parking spots in
                your desired location. Use the map or search function to explore
                nearby options and filter by price, distance, or amenities.
              </p>
            </div>
          </div>
          <div className="step_box">
            <div className="number">
              <img src={reserveIcon} alt="" />
              {/* <i class="fa-solid fa-circle-check"></i>{" "} */}
            </div>
            <div className="text">
              <h3>Choose Your Spot</h3>
              <p>
                Browse through available spots, check real-time availability,
                and view detailed information including photos and user reviews.
                Select the perfect spot that fits your needs.
              </p>
            </div>
          </div>
          <div className="step_box">
            <div className="number">
              <img src={payIcon} alt="" />
              {/* <i class="fa-solid fa-bookmark"></i>{" "} */}
            </div>
            <div className="text">
              <h3>Reserve & Pay</h3>
              <p>
                Once you’ve found the ideal spot, reserve it with a click.
                Complete your payment securely, and receive instant confirmation
                with all the details you need.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="features">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>
            Explore the advantages of our smart parking solution and how it
            enhances your parking experience.
          </p>
        </div>{" "}
        <div className="feature_boxs">
          {" "}
          <div className="feature-box">
            <div className="icon">
              <img src={availableIcon} alt="" />
              {/* <i className="fas fa-search"></i> */}
            </div>
            <div className="text">
              <h3>Real-Time Availability</h3>
              <p>Get up-to-date information on available parking spots.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="icon">
              <img src={secureIcon} alt="" />
              {/* <i className="fas fa-lock"></i> */}
            </div>
            <div className="text">
              <h3>Secure Payments</h3>
              <p>
                Enjoy secure transactions with our integrated payment system.
              </p>
            </div>
          </div>
          <div className="feature-box">
            <div className="icon">
              <img src={userFrinedlyIcon} alt="" />
              {/* <i className="fas fa-mobile-alt"></i> */}
            </div>
            <div className="text">
              <h3>User-Friendly Interface</h3>
              <p>Easy navigation and quick searches for your convenience.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="icon">
              <img src={chooseIcon} alt="" />
              {/* <i className="fas fa-calendar-day"></i> */}
            </div>
            <h3>Flexible Options</h3>
            <p>Reserve for a few hours or several days, based on your needs.</p>
          </div>
        </div>
      </section>
      <section className="feature-highlight">
        <div className="feature-image">
          <img src={userImg} alt="Feature Image" />
        </div>
        <div className="feature-content">
          <p className="supporting-line">Discover Our Key Feature</p>
          <img src={curveLine} alt="" />
          <h2>Unlock the Best Parking Experience</h2>
          <p>
            Our innovative system makes parking and renting spaces more
            convenient than ever. Sign up to experience seamless parking
            management and discover new opportunities to list your space.
          </p>
          <a href="#signup" className="cta-button">
            Get Started
          </a>
        </div>
      </section>
      <section className="testimonials">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p>
            Hear from satisfied users who have transformed how they park and
            rent out their spaces.
          </p>
        </div>
        {/* {reviews?.length > 0 && (
          <div className="reservation_detail_right_reviews">
            {reviews?.map((review, index) => {
              return (
                <>
                  <div className="review-item" key={index}>
                    <h4>{review?.userId?.fName}</h4>
                    <div className="review-meta">
                      <span>{review?.rating}</span>
                      <i className="fa-solid fa-star"></i>
                      <span>{reviewDateCalculator(review)}</span>
                    </div>
                    <p>"{review?.reviewMsg}"</p>
                  </div>
                </>
              );
            })}
          </div>
        )} */}
        <div className="testimonials-container">
          {siteSetting?.reviewsToShow?.length > 0 &&
            siteSetting?.reviewsToShow.map((review, index) => {
              return (
                <div class="card">
                  <div class="card-image">
                    <img
                      src={`http://localhost:5000/${review?.spaceId?.images[0]}`}
                      alt="Profile picture"
                    />
                  </div>
                  <div class="card-content">
                    <h3 class="card-title">
                      {review?.userId?.fName} {review?.userId?.lName}
                    </h3>
                    <p class="card-subtitle">{review?.spaceId?.title}</p>
                    <p class="card-description">{review?.reviewMsg}</p>
                    <div className="star-rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <i
                          key={index}
                          className={`fa${
                            index < review?.rating ? "s" : "r"
                          } fa-star`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      <section className="call-to-action">
        <div className="cta-content">
          <h2>Get Started Today</h2>
          <p>
            Sign up now to find your perfect parking spot or list your space for
            rent. Experience the future of parking with our smart solution.
          </p>
          <Link to={"/signup"} className="cta-button">
            Sign Up Now
          </Link>
        </div>
      </section>

      <section className="faqs">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>
            Find answers to the most common questions about our parking and
            renting solutions.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question" onClick={() => handleClick(index)}>
                <h3>{faq.question}</h3>
              </div>
              <div
                className="faq-answer"
                style={{ height: activeIndex === index ? height : "0px" }}
                ref={activeIndex === index ? contentRef : null}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="partners">
        <div className="section-header">
          <h2>Our Partners</h2>
          <p>
            We collaborate with industry leaders to bring you the best parking
            solutions.
          </p>
        </div>
        <div className="partners-scroll">
          <div className="partners-list">
            <div className="partner-item">
              <img src={Partner1} alt="Partner 1" />
            </div>
            <div className="partner-item">
              <img src={Partner2} alt="Partner 2" />
            </div>
            <div className="partner-item">
              <img src={Partner3} alt="Partner 3" />
            </div>
            <div className="partner-item">
              <img src={Partner4} alt="Partner 4" />
            </div>
            <div className="partner-item">
              <img src={Partner1} alt="Partner 1" />
            </div>
            <div className="partner-item">
              <img src={Partner2} alt="Partner 2" />
            </div>
            <div className="partner-item">
              <img src={Partner3} alt="Partner 3" />
            </div>
            <div className="partner-item">
              <img src={Partner4} alt="Partner 4" />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="contact-us">
        <div className="section-header">
          <h2>Contact Us</h2>
          <p>We're here to help. Reach out to us with any questions or concerns.</p>
        </div>
        <div className="contact-form-container">
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </section> */}

      <Footer siteName={siteSetting?.siteName} />
    </>
  );
};

export default Home;

import ReuseButton from "../Button/ReuseButton";

const NotFound = () => {
  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
        }

        html, body {
          height: 100%;
          overflow: hidden;
        }

        body {
          padding: 0;
          margin: 0;
          font-size: 14px;
          line-height: 1;
          background: #0a0a08;
          position: relative;
        }

        /* Add background video */
        video.background-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: -1;
        }

        /* Dark gradient overlay */
        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(0, 0, 0,0.7), rgba(0, 0, 0, 0.7));
          z-index: 0;
        }

        label {
          cursor: pointer;
        }

        a {
          margin: 0;
          padding: 0;
          vertical-align: baseline;
          background: transparent;
          text-decoration: none;
          color: #000;
        }

        input, select, button, textarea {
          margin: 0;
          font-size: 100%;
        }

        html, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
        a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp,
        small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li,
        fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, input {
          border: 0;
          outline: 0;
          font-size: 100%;
          vertical-align: baseline;
          background: transparent;
        }

        .top-header::before {
          content: '';
          display: block;
          width: 100%;
          height: 4px;
          background-repeat: repeat-x;
          background-size: contain;
          position: absolute;
          top: 0;
          left: 0;
          background-color: #ffffff;
        }

        .lamp {
          position: absolute;
          left: 0px;
          right: 0px;
          top: 0px;
          margin: 0px auto;
          width: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform-origin: center top;
          animation-timing-function: cubic-bezier(0.6, 0, 0.38, 1);
          animation: move 5.1s infinite;
        }

        @keyframes move {
          0% {
            transform: rotate(40deg);
          }
          50% {
            transform: rotate(-40deg);
          }
          100% {
            transform: rotate(40deg);
          }
        }

        .cable {
          width: 8px;
          height: 200px;
          background-color: #ffffff;
        }

        .cover {
          width: 200px;
          height: 80px;
          background: #797979;
          border-top-left-radius: 50%;
          border-top-right-radius: 50%;
          position: relative;
          z-index: 200;
        }

        .in-cover {
          width: 100%;
          max-width: 200px;
          height: 20px;
          border-radius: 100%;
          background: #79797999;
          position: absolute;
          left: 0px;
          right: 0px;
          margin: 0px auto;
          bottom: -9px;
          z-index: 100;
        }

        .in-cover .bulb {
          width: 50px;
          height: 50px;
          background-color: #ffffff;
          border-radius: 50%;
          position: absolute;
          left: 0px;
          right: 0px;
          bottom: -20px;
          margin: 0px auto;
          box-shadow: 0 0 25px 7px rgb(255 255 255 / 80%), 0 0 64px 47px rgba(255,255,255,0.5), 0px 0 30px 15px rgba(255,255,255,0.2);
        }

        .light {
          width: 200px;
          height: 0px;
          border-bottom: 900px solid rgb(255 255 255 / 24%);
          border-left: 50px solid transparent;
          border-right: 50px solid transparent;
          position: absolute;
          left: 0px;
          right: 0px;
          top: 270px;
          margin: 0px auto;
          z-index: 1;
          border-radius: 90px 90px 0px 0px;
        }

        .error {
          min-height: 100vh;
          position: relative;
          padding: 240px 0;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          text-align: center;
          margin-top: 70px;
        }

        .error__content {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          transform: translate(-50%, -50%);
        }

        .error__message {
          text-align: center;
          color: #ffffff88;
        }

        .message__title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 5px;
          margin:0px auto 20px;
        }

        .message__text {
          font-family: 'Montserrat', sans-serif;
          font-size: 18px;
          padding: 0 60px;
          max-width: 680px;
          color: #f1f1ff66;
          margin:0px auto 16px;
        }

        .error__nav {
          max-width: 600px;
          margin: 40px auto 0;
          text-align: center;
        }

        .e-nav__link {
          height: 45px;
          line-height: 45px;
          width: 170px;
          display: inline-block;
          vertical-align: top;
          margin: 0 15px ;
          border: 1px solid #181828;
          color: #181828;
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: .1rem;
          position: relative;
          overflow: hidden;
        }

        .e-nav__link:hover {
          color: #fff;
        }
      `}</style>

      {/* Background Video */}
      <video className="background-video" autoPlay loop muted>
        <source src="/assets/video/notFound.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="video-overlay"></div>

      <header className="top-header"></header>

      {/* Dust particle */}
      <div>
        <div className="starsec"></div>
        <div className="starthird"></div>
        <div className="starfourth"></div>
        <div className="starfifth"></div>
      </div>

      <div className="lamp__wrap">
        <div className="lamp">
          <div className="cable"></div>
          <div className="cover"></div>
          <div className="in-cover">
            <div className="bulb"></div>
          </div>
          <div className="light"></div>
        </div>
      </div>

      <section className="error">
        {/* Content */}
        <div className="error__content">
          <div className="error__message message">
            <h1 className="message__title !text-3xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl">
              Page Not Found
            </h1>
            <p className="message__text  mb-10">
              We&apos;re sorry, the page you were looking for isn&apos;t found
              here. The link you followed may either be broken or no longer
              exists. Please try again, or take a look at our home page.
            </p>
          </div>
          <ReuseButton
            url="/"
            variant="ghost"
            className="w-full md:w-auto !text-base-color/40 hover:!bg-base-color/40 hover:text-primary-color hover:!border-base-color/40"
          >
            Back to Home
          </ReuseButton>
        </div>
        {/* END Content */}
      </section>
    </>
  );
};

export default NotFound;

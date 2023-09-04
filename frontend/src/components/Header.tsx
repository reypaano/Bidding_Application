import style from "../styles/utils.module.css";

export const Header = () => {
  return (
    <header id="header">
      <div className={`${style.intro}`}>
        <div className={`${style.overlay}`}>
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  Bidding Application
                  <span></span>
                </h1>
                <p>
                  Introducing our cutting-edge bidding application, designed to
                  revolutionize the way you engage in competitive auctions and
                  secure the best deals. With user-friendly interfaces,
                  real-time updates, and advanced bidding strategies, our
                  application empowers you to participate confidently in various
                  bidding scenarios, whether it's online auctions, procurement
                  processes, or fundraising events. Say goodbye to manual
                  bidding hassles and embrace a streamlined, efficient, and
                  rewarding bidding experience with our innovative application.
                  Get ready to bid smarter and win bigger with us!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

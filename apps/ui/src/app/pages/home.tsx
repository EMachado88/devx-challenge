import Button from 'react-bootstrap/Button';

interface HomeProps {
  openLogin: () => void;
}

export function Home(props: HomeProps) {
  const { openLogin } = props;

  return (
    <main>
      <div className="home-hero px-4 py-5 text-center text-light">
        <h1 className="display-5 fw-bold">Welcome to XPTO</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4 p-4">
            Bacon ipsum dolor amet tri-tip meatball laboris turducken
            landjaeger, deserunt dolore pariatur pork chop culpa picanha in
            exercitation irure. Alcatra mollit hamburger filet mignon. Velit
            dolore esse dolor. Et short loin non magna fugiat. Bresaola laboris
            consectetur, rump chicken pork belly qui beef. Incididunt sausage
            picanha kielbasa. Lorem qui exercitation capicola alcatra id. Rump
            velit irure, ham officia excepteur pig est. Capicola short loin
            turkey duis. Dolor labore andouille spare ribs. Deserunt esse
            officia buffalo enim bacon biltong magna short loin mollit.
            Incididunt ribeye in nostrud andouille. Hamburger porchetta
            consequat rump sausage. T-bone ea shank, ex incididunt sirloin cupim
            turducken laborum ut. Chuck aliqua ut tenderloin leberkas hamburger,
            pork ham kielbasa salami shankle spare ribs esse lorem veniam. Shank
            capicola prosciutto in.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Button
              size="lg"
              variant="primary"
              className="px-4 gap-3"
              onClick={openLogin}
            >
              Sign up
            </Button>
            <Button variant="secondary" size="lg" className="px-4">
              Know more
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

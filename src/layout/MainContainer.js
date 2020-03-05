import React from 'react'
import styled from 'styled-components'
import Container from '@material-ui/core/Container'
import { useTheme } from '@material-ui/core'

const BackLayer = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.palette.primary.main};
`

const FrontLayer = styled.main`
  position: relative;
  top: 127px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: calc(100% - 127px);
  background: #fff;
  overflow: auto;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    position: absolute;
    top: 64px;
    right: 0;
    z-index: 1100;
    border-top-left-radius: 33px;
    width: calc(100% - 92px);
    min-height: calc(100vh - 64px);
    background: #fff;
  }
`

const MainContainer = () => {
  const theme = useTheme()

  return (
    <BackLayer theme={theme}>
      <FrontLayer theme={theme}>
        <Container>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            incidunt dicta eveniet commodi fuga harum impedit voluptate, at
            beatae magnam culpa aliquid omnis saepe officia nesciunt aliquam
            atque blanditiis vitae ducimus, et tenetur ut! Repellendus
            cupiditate sint eveniet quos, reiciendis earum recusandae repellat
            incidunt! Neque numquam doloremque exercitationem rem eaque a
            explicabo, porro molestias cum repudiandae omnis modi cumque itaque
            magni! Odit in esse reprehenderit neque assumenda eligendi a sit ex
            corporis incidunt vel delectus ea corrupti rem vitae rerum, placeat
            numquam, quia cumque! Vel nesciunt sed, cupiditate, tenetur dolore
            autem accusamus velit necessitatibus expedita error excepturi
            dolorum, quae veniam.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat eius
            molestias, et aut itaque eos dolore nesciunt voluptate mollitia, qui
            atque asperiores beatae error provident in doloremque tempore quo
            quod corporis dicta explicabo iusto. Fugiat saepe tenetur, repellat
            vero iure repellendus quam soluta illum dignissimos ex eaque
            dolores, quis vitae laudantium assumenda nesciunt dicta beatae
            asperiores eligendi enim nobis excepturi ab, deleniti modi. Tempore
            minus molestiae quidem ducimus beatae vel ad, harum perferendis
            unde. Hic obcaecati voluptate odit dolores. Sunt pariatur aliquam
            sed ratione aperiam veniam optio itaque nam quis tenetur quae ab
            nihil quam architecto excepturi harum accusamus iure dolorem velit,
            sit unde sapiente! Nesciunt error qui fuga blanditiis tempore
            dolores, doloribus, vitae temporibus beatae magnam pariatur eius
            sunt non quidem neque consectetur, reiciendis fugiat. Neque, unde
            error, atque fugiat iure alias explicabo non et maiores ea labore
            consequatur reprehenderit culpa est libero sunt pariatur in nulla?
            Nulla incidunt veniam vitae qui architecto ducimus sint nostrum
            ipsa, vero quod dolores enim voluptatem eius asperiores accusamus
            ab, quos quae quibusdam eum ullam! Expedita quia, at quas ducimus
            qui voluptatem neque quidem odit, reprehenderit consequuntur
            quisquam. Error quae amet consectetur soluta animi quas officia,
            consequuntur ut aliquam inventore distinctio consequatur rem
            similique eum placeat ipsam corporis non! Iure, quia accusamus.
            Perspiciatis error omnis, asperiores nemo soluta quod illo dolorum,
            harum minus provident pariatur, magni velit tempora reprehenderit
            repudiandae earum. Ex ad deleniti natus nesciunt, minima amet
            explicabo ipsam deserunt quasi reiciendis magnam molestiae adipisci
            laudantium neque. Accusamus, magnam ut eius vero adipisci
            consequatur doloribus fuga qui repellat asperiores unde veniam odio
            libero cumque odit similique, vel nemo sed ea debitis maiores
            perferendis deserunt laboriosam molestias. Sit accusamus est rem
            delectus, facilis suscipit corporis dolore numquam. Atque, neque.
            Modi possimus eveniet obcaecati eum officia sint molestias eos
            mollitia quis laboriosam laborum illum, libero at dolorem nulla iure
            consectetur ex, distinctio consequatur, nesciunt autem
            necessitatibus qui veritatis! Perspiciatis, suscipit ad? Explicabo
            sed possimus voluptatem cum officia tempora voluptas deleniti eum
            asperiores odit? Aut assumenda minima quae iusto porro fugiat dolor
            quis aperiam autem totam repudiandae laborum officiis, itaque
            veritatis, enim neque dolorem voluptas dignissimos modi error!
            Corrupti tempore deleniti minima asperiores nihil repellat hic eius
            natus molestiae id consequatur neque necessitatibus totam suscipit,
            optio voluptas dolorem. Consequatur, sunt sit temporibus laborum aut
            possimus aspernatur aperiam alias? Tempore quia, itaque minima dicta
            magnam ad suscipit fugiat quos, ipsam, voluptate ex quo illo aut?
            Impedit facere neque nihil repellendus aliquid adipisci sunt
            voluptatem praesentium quae, porro officia! Enim quos error
            provident tempore molestiae sapiente aspernatur dolores iure,
            aperiam non, at recusandae doloribus impedit nostrum similique vel
            reprehenderit ab, officiis ratione. Ut hic error facilis magni,
            delectus consectetur velit libero nulla. Vitae, porro? Ipsam
            incidunt suscipit libero harum obcaecati vel non quis fugiat quos
            iusto corporis praesentium vero aspernatur magni mollitia voluptate,
            veniam eum numquam qui omnis culpa repellat labore. Ratione libero
            odio atque, possimus incidunt nulla? Ipsam, quibusdam. Provident
            pariatur obcaecati iste nulla aut iure tempora nobis quis id quo
            sunt aperiam magni, velit natus reiciendis officia debitis. Aliquam,
            temporibus alias. Aliquid libero id optio suscipit expedita possimus
            aspernatur, adipisci necessitatibus minima pariatur voluptas hic
            quaerat tempore eos totam. Doloribus error fugit sapiente saepe
            aspernatur placeat nihil libero? Illo ipsa aliquam, dicta quisquam
            ad vitae nam sunt vel cum odit dolor repellendus animi odio optio
            debitis temporibus. Alias magnam necessitatibus nulla recusandae
            itaque corporis dolore sit nam, beatae quis blanditiis ducimus
            optio, fuga voluptatum laudantium tenetur? Praesentium atque officia
            alias error. Nisi animi modi rem saepe! Maxime natus cum vero libero
            aut odit quibusdam, iusto modi ad obcaecati sequi pariatur rerum
            aliquam neque dolore nobis repudiandae suscipit ipsam nemo inventore
            voluptatem? Eum corrupti consequatur vitae iste fugit perspiciatis,
            similique tenetur, iure commodi pariatur enim quidem reprehenderit
            temporibus nam nesciunt voluptate eligendi vel! Hic, rem? Harum
            distinctio in, maiores quisquam fugit inventore cum fuga nihil
            provident velit vel deleniti earum unde quia magni eligendi at.
            Tempora autem tenetur est. Aut architecto voluptatum officia hic
            fuga ex quae facilis minima, expedita modi totam mollitia ullam
            accusamus nisi consequuntur id cumque ratione veritatis. Esse earum
            iusto perspiciatis omnis deleniti reprehenderit laudantium ab
            possimus inventore officia dignissimos nemo, modi vitae doloribus
            reiciendis sapiente temporibus maiores iste! Sint veritatis facere
            beatae maxime. Vero, temporibus ipsum repellendus distinctio ullam
            quae voluptates, ipsam libero fuga perspiciatis quaerat recusandae
            veritatis. Voluptates iure delectus aliquid error eos vero, amet,
            fuga at magni incidunt aperiam ullam nesciunt eum, inventore
            corporis quam harum iste distinctio nemo deleniti sed minus eveniet!
            Aut, qui consequuntur, dolor deserunt consectetur ipsa fugit atque
            eveniet sed mollitia libero corporis, cum repellendus quaerat odio
            ad rem optio. Dignissimos mollitia provident laborum nobis quaerat
            tempore veritatis accusantium voluptatibus quam dolorum aspernatur
            odio voluptatum non atque impedit ab, fugiat perferendis rem
            repellendus. Et repudiandae quaerat quam corrupti eos. Et
            repudiandae nesciunt doloremque ex quis? Necessitatibus laudantium
            nihil eveniet accusamus corporis maxime distinctio cum, hic in
            debitis pariatur nobis error officia animi eligendi sit eaque natus.
            Quidem illum voluptates debitis, laudantium, quas amet libero earum
            eaque veniam officiis dolore at a eligendi? Tempora facilis qui,
            praesentium ratione laudantium non mollitia maxime incidunt,
            distinctio tempore, sed a. Delectus reiciendis hic modi esse dolor
            facilis, quaerat accusamus aliquid fugit a adipisci suscipit maxime
            officia recusandae at, ad nihil earum repellendus, praesentium
            repellat libero. Maiores distinctio ea voluptatibus, libero mollitia
            odit sapiente eius expedita facere nobis debitis voluptates omnis
            voluptas pariatur animi eaque ratione velit perferendis sunt neque
            magni soluta nesciunt labore vel? Iste sint mollitia, facere qui
            nam, laudantium velit fuga, vero temporibus dolore aspernatur culpa?
            Ullam dicta nulla earum eos nemo esse incidunt dolores illo! Nam aut
            sequi placeat, ut veniam cumque sed numquam rerum itaque animi
            beatae, impedit ex repellendus similique natus cupiditate
            repudiandae consequatur architecto officia perspiciatis, nisi porro.
            Numquam pariatur quia voluptas eos perspiciatis quaerat itaque.
            Dolorum esse quidem ab aliquid, necessitatibus iste est eius saepe
            dignissimos ipsum qui sequi nulla optio blanditiis officia facere,
            voluptates illum error temporibus cumque asperiores at excepturi
            dolor sapiente? Totam quam fuga alias quia quisquam nihil similique.
          </p>
        </Container>
      </FrontLayer>
    </BackLayer>
  )
}

export { MainContainer }

import { v4 as uuidv4 } from 'uuid';
import Circle from "../assets/shape-snap/circle.png"
import Square from "../assets/shape-snap/square.png"
import Triangle from "../assets/shape-snap/triangle.png"
import Star from "../assets/shape-snap/star.png"
import CircleDashImage from "../assets/shape-snap/circle-dash.png"
import SquareDashImage from "../assets/shape-snap/square-dash.png"
import StarDashImage from "../assets/shape-snap/star-dash.png"
import TriangleDashImage from "../assets/shape-snap/triangle-dash.png"

  const shapes = {
    DRAGCIRCLE: { type: 'drag-circle',
                  id: uuidv4(),
                  name: 'DRAGCIRCLE',
                  path: Circle,
                  left: '60%',
                  top: '10%',
                  dropSrc: CircleDashImage,
                },
    DRAGSQUARE: { type: 'drag-square',
                id: uuidv4(),
                name: 'DRAGSQUARE',
                path: Square,
                left: '70%',
                top: '70%',
                dropSrc: SquareDashImage,
              },
    DRAGSTAR: { type: 'drag-star',
              id: uuidv4(),
              name: 'DRAGSTAR',
              path: Star,
              left: '15%',
              top: '5%',
              dropSrc: StarDashImage,
            },
    DRAGTRIANGLE: { type: 'drag-triangle',
            id: uuidv4(),
            name: 'DRAGTRIANGLE',
            path: Triangle,
            left: '25%',
            top: '60%',
            dropSrc: TriangleDashImage,
          }
  }

  export const dragItemTypes = {
    SHAPES: shapes
  }

export const getImageName = (dropName) => {
    console.log(dropName.split('-')[1])
    return dropName.split('-')[1]
}
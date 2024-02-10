// postcss library
const postcss = require( 'postcss' );

module.exports = ( root ) => {
    const colors = require( '../../resources/css/tailwind.config' ).theme.colors;

    root.walkAtRules( 'llTailwindColors', ( atRule ) => {
        function flattenColors( colorsObj, colorPrefix = '' ) {
            let flattenedColors = {};
            for ( const color in colorsObj ) {
                if ( colorsObj.hasOwnProperty( color ) ) {
                    const colorValue = colorsObj[color];
                    const colorName = `${colorPrefix}${color}`;
                    if ( typeof colorValue === 'object' ) {
                        const nestedColors = flattenColors( colorValue, `${colorName}-` );
                        flattenedColors = {...flattenedColors, ...nestedColors};
                    } else {
                        flattenedColors[colorName] = colorValue;
                    }
                }
            }
            return flattenedColors;
        }

        const flattenedColors = flattenColors( colors );

        for ( const color in flattenedColors ) {
            if ( flattenedColors.hasOwnProperty( color ) ) {
                const textColor = postcss.rule( {
                    selector: `.text-${color}`,
                } ).append(
                    postcss.decl( {
                        prop: 'color',
                        value: flattenedColors[color],
                    } ),
                );
                root.append( textColor );

                const bgColor = postcss.rule( {
                    selector: `.bg-${color}`,
                } ).append(
                    postcss.decl( {
                        prop: 'background-color',
                        value: flattenedColors[color],
                    } ),
                );
                root.append( bgColor );
            }
        }

        atRule.remove();
    } );
};

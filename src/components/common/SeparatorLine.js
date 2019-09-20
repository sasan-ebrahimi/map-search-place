import React from 'react';
import { View} from 'react-native';

/**
 * A functional components which returns a view to be used as a line separator
 *
 * @param props
 * @returns {View}
 * @constructor
 */
const SeparatorLine = (props) => {
    return(
        <View
            style={{
                margin:0,
                borderBottomWidth: 1.4,
                borderBottomColor: "#000000",
                opacity:0.2
            }}
        ></View>
    );
};

export {SeparatorLine};
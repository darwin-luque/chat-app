import { useMemo } from 'react';
import { Image, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import { theme } from '../../../constants';

export interface ProfilePictureProps {
  picture?: string;
  size?: number;
}

export const ProfilePicture = ({ picture, size = 40 }) => {
  const imageSize = useMemo(() => Math.round(size * 0.8), [size]);
  return (
    <View
      style={StyleSheet.compose<ViewStyle>(styles.container, {
        width: size,
        height: size,
      })}
    >
      {picture ? (
        <Image
          source={{ uri: picture }}
          style={StyleSheet.compose<ImageStyle>(styles.image, {
            width: imageSize,
            height: imageSize,
          })}
        />
      ) : (
        <Icon name="user" color={theme.colors.text} size={imageSize} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  image: {},
});

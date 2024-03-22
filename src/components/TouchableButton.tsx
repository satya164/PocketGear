import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, type GestureResponderEvent } from 'react-native';

type Props = React.ComponentProps<typeof TouchableOpacity> & {
  onPress: (e: GestureResponderEvent) => void;
  children: React.ReactNode;
};

function TouchableButton({ onPress: onPressCustom, children, ...rest }: Props) {
  const intervalRef = useRef<NodeJS.Timeout>();
  const timeoutRef = useRef<NodeJS.Timeout>();
  const handledRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      cleanUp();
    };
  }, []);

  const cleanUp = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    handledRef.current = false;
  };

  const onPressIn = (e: GestureResponderEvent) => {
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        handledRef.current = true;
        onPressCustom(e);
      }, 50);
    }, 750);
  };

  const onPressOut = (e: GestureResponderEvent) => {
    if (!handledRef.current) {
      onPressCustom(e);
    }

    cleanUp();
  };

  return (
    <TouchableOpacity {...rest} onPressIn={onPressIn} onPressOut={onPressOut}>
      {children}
    </TouchableOpacity>
  );
}

export default TouchableButton;

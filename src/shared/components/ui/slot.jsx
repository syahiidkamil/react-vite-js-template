import * as React from "react";

/**
 * Slot component that merges its props with its child's props
 * This is a simplified implementation of Radix UI's Slot component
 */
export const Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray[0];

  if (!React.isValidElement(slottable)) {
    return null;
  }

  return React.cloneElement(slottable, {
    ...mergeProps(slotProps, slottable.props),
    ref: forwardedRef ? composeRefs(forwardedRef, slottable.ref) : slottable.ref,
  });
});

Slot.displayName = "Slot";

/**
 * Merge props from the Slot component with the child component's props
 * Child props take precedence over Slot props
 */
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = propName.startsWith("on");
    if (isHandler) {
      // Compose event handlers
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      // Merge styles
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      // Concatenate classNames
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(" ");
    }
  }

  // Add props from Slot that don't exist on child
  return { ...slotProps, ...overrideProps };
}

/**
 * Compose multiple refs into a single ref callback
 */
function composeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    });
  };
}
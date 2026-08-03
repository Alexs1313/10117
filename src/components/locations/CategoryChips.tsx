import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  LOCATION_CATEGORIES,
  type LocationCategory,
} from '../../data/locations';

import { colors, fonts, radius } from '../../constants/theme';

type CategoryChipsProps = {
  activeCategory: LocationCategory;
  onSelect: (category: LocationCategory) => void;
};

export function CategoryChips({
  activeCategory,
  onSelect,
}: CategoryChipsProps) {
  return (
    <View style={styles.CategoryChipsFacetChassis}>
      {LOCATION_CATEGORIES.map(category => {
        const isActive = category.id === activeCategory;

        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            style={[
              styles.CategoryChipsChip,
              isActive
                ? styles.CategoryChipsChipActive
                : styles.CategoryChipsChipInactive,
            ]}
          >
            <Text
              style={[
                styles.CategoryChipsLabelFiligree,
                isActive
                  ? styles.CategoryChipsLabelActive
                  : styles.CategoryChipsLabelInactive,
              ]}
            >
              {category.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  CategoryChipsFacetChassis: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  CategoryChipsChip: {
    borderRadius: radius.chip,
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingVertical: 8,
  },
  CategoryChipsChipActive: {
    backgroundColor: colors.button,
    borderColor: colors.button,
  },

  CategoryChipsChipInactive: {
    backgroundColor: colors.chip,
    borderColor: colors.chipBorder,
  },

  CategoryChipsLabelFiligree: {
    fontFamily: fonts.sansBold,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },

  CategoryChipsLabelActive: {
    color: colors.buttonText,
  },
  CategoryChipsLabelInactive: {
    color: colors.chipText,
  },
});

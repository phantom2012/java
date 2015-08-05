package com.yy.ent.tvbar.common.validator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.hibernate.validator.constraints.impl.LengthValidator;

import com.yy.ent.tvbar.common.validator.constraints.ChineseLength;

/**
 * 中文长度验证
 * 
 * @see LengthValidator
 * @author suzhihua
 * @date 2015年3月31日 上午10:02:12
 */
public class ChineseLengthValidator implements ConstraintValidator<ChineseLength, String> {
    private int min;
    private int max;

    public void initialize(ChineseLength parameters) {
        min = parameters.min();
        max = parameters.max();
        validateParameters();
    }

    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null) {
            return true;
        }
        int length = chineseLength(value);
        return length >= min && length <= max;
    }

    private void validateParameters() {
        if (min < 0) {
            throw new IllegalArgumentException("The min parameter cannot be negative.");
        }
        if (max < 0) {
            throw new IllegalArgumentException("The max parameter cannot be negative.");
        }
        if (max < min) {
            throw new IllegalArgumentException("The length cannot be negative.");
        }
    }

    private static int chineseLength(String str) {
    	str=str.replaceAll("\r", "");
        int length = str.length();
        int result = length;
        for (int i = 0; i < length; i++) {
            if ((str.charAt(i) & 0xff00) != 0) result++;
        }
        return (result + 1) >> 1;
    }

    public static void main(String[] args) {
        System.out.println(chineseLength("11"));
        System.out.println(chineseLength("111"));
        System.out.println(chineseLength("我"));
        System.out.println(chineseLength("我1"));
    }
}

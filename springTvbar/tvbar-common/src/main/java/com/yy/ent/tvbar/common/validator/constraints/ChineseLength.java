package com.yy.ent.tvbar.common.validator.constraints;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.CONSTRUCTOR;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

import com.yy.ent.tvbar.common.validator.ChineseLengthValidator;
import org.hibernate.validator.constraints.Length;

/**
 * 中文长度验证
 * 
 * @see Length
 * @author suzhihua
 * @date 2015年3月31日 上午10:03:10
 */
@Documented
@Constraint(validatedBy = ChineseLengthValidator.class)
@Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})
@Retention(RUNTIME)
public @interface ChineseLength {
    int min() default 0;

    int max() default Integer.MAX_VALUE;

    String message() default "{ChineseLength.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    /**
     * Defines several {@code @Length} annotations on the same element.
     */
    @Target({METHOD, FIELD, ANNOTATION_TYPE, CONSTRUCTOR, PARAMETER})
    @Retention(RUNTIME)
    @Documented
    public @interface List {
        ChineseLength[] value();
    }
}
